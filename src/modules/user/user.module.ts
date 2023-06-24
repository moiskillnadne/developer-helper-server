import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../../database/entities/User.entity'
import { UserService } from './user.service'
import { CognitoModule } from '../../integrations/Cognito/cognito.module'
import { UserCrudService } from './user.crud'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CognitoModule],
  controllers: [UserController],
  providers: [UserService, UserCrudService],
  exports: [],
})
export class UserModule {}
