import { PickType } from '@nestjs/swagger'
import { UserEntity } from '../../../database/entities/User.entity'
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator'
import { messageWrapper } from '../../../core/helpers/validator/messageWrapper'
import { PASSWORD_MIN_LENGTH, passwordRequiredRulesRegExp } from '../../../core/constants/password'

export class SignupBodyDTO extends PickType(UserEntity, ['firstName', 'lastName', 'email'] as const) {
  @IsNotEmpty(messageWrapper('Email не может быть пустым'))
  @IsEmail({}, messageWrapper('Email не валиден'))
  public email: string

  @IsNotEmpty(messageWrapper('Имя не может быть пустым'))
  @MinLength(2, messageWrapper('Имя должно быть не менее 2 символов'))
  public firstName: string

  @IsNotEmpty(messageWrapper('Фамилия не может быть пустой'))
  @MinLength(2, messageWrapper('Фамилия должна быть не менее 2 символов'))
  public lastName: string

  @MinLength(PASSWORD_MIN_LENGTH, messageWrapper('Пароль должен быть не менее 8 символов'))
  @Matches(
    passwordRequiredRulesRegExp,
    messageWrapper('Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру'),
  )
  public password: string
}
