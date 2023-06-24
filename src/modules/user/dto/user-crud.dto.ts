import { PickType } from '@nestjs/swagger'
import { UserEntity } from '../../../database/entities/User.entity'

export class SaveUserPayloadDTO extends PickType(UserEntity, [
  'email',
  'firstName',
  'lastName',
  'cognitoId',
  'username',
] as const) {}

export class GetUserByIdPayloadDTO extends PickType(UserEntity, ['id']) {}
