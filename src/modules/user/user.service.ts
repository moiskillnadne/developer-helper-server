import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { CognitoService } from '../../integrations/Cognito/cognito.service'
import { LoginBodyDTO, SignupBodyDTO } from './dto/user-controller.dto'
import { UserCrudService } from './user.crud'
import { SuccessResponseCodes } from '../../core/dictionary/success.codes'
import { InternalServerError } from '../../core/errors/internal-server'
import { ErrorResponseCodes } from '../../core/dictionary/error.codes'
import { UserEntity } from '../../database/entities/User.entity'
import { BadRequestError } from '../../core/errors/bad-request'

@Injectable()
export class UserService {
  constructor(private cognitoService: CognitoService, private userCrudService: UserCrudService) {}

  public async login(payload: LoginBodyDTO) {
    const user = await this.getUserByEmail(payload.email)

    if (!user) {
      throw new BadRequestError('Пользователь с таким email не найден!', ErrorResponseCodes.LOGIN_FAILED)
    }

    const cognitoResult = await this.cognitoService.login(user.username, payload.password)

    if (!cognitoResult.isSuccess) {
      throw new BadRequestError('Неверный email или пароль!', ErrorResponseCodes.LOGIN_FAILED)
    }

    return {
      isSuccess: true,
      code: SuccessResponseCodes.OK,
      details: {
        user: user,
        accessToken: cognitoResult.result.AuthenticationResult.AccessToken,
        refreshToken: cognitoResult.result.AuthenticationResult.RefreshToken,
        idToken: cognitoResult.result.AuthenticationResult.IdToken,
      },
    }
  }

  public async signup(payload: SignupBodyDTO) {
    const user = await this.getUserByEmail(payload.email)

    const generatedUsername = uuidv4()

    if (user) {
      throw new BadRequestError('Пользователь с таким email уже существует!', ErrorResponseCodes.SIGNUP_FAILED)
    }

    const cognitoResult = await this.cognitoService.signUp({
      email: payload.email,
      password: payload.password,
      username: generatedUsername,
    })

    if (!cognitoResult.isSuccess) {
      throw new InternalServerError('Произошла ошибка во время создания аккаунта!', ErrorResponseCodes.SIGNUP_FAILED)
    }

    const userCrudResult = await this.userCrudService.save({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      cognitoId: cognitoResult.result.UserSub,
      username: generatedUsername,
    })

    return {
      isSuccess: true,
      code: SuccessResponseCodes.CREATED,
      details: userCrudResult,
    }
  }

  public async logout() {
    return 'logout'
  }

  public async refresh() {
    return 'refresh'
  }

  private getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userCrudService.getByParams({ email })
  }
}