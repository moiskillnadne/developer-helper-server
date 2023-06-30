import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [ConfigModule.forRoot(), HealthCheckModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
