import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CognitoService } from './cognito.service'

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [CognitoService],
  exports: [CognitoService],
})
export class CognitoModule {}
