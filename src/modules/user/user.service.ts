import { Injectable } from '@nestjs/common'
import { CognitoService } from '../../integrations/Cognito/cognito.service'
import { SignupBodyDTO } from './dto/user-controller.dto'
import { UserCrudService } from './user.crud'
import { SuccessResponseCodes } from '../../core/dictionary/success.codes'
import { InternalServerError } from '../../core/errors/internal-server'
import { ErrorResponseCodes } from '../../core/dictionary/error.codes'

@Injectable()
export class UserService {
  constructor(private cognitoService: CognitoService, private userCrudService: UserCrudService) {}

  public async login() {
    return 'login'
  }

  public async signup(payload: SignupBodyDTO) {
    const cognitoResult = await this.cognitoService.signUp({ email: payload.email, password: payload.password })

    if (!cognitoResult.isSuccess) {
      throw new InternalServerError('Произошла ошибка во время создания аккаунта!', ErrorResponseCodes.SIGNUP_FAILED)
    }

    const userCrudResult = await this.userCrudService.save({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      cognitoId: cognitoResult.result.UserSub,
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
}
