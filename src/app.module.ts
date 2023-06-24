import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './modules/user/user.module'
import { ErrorsInterceptor } from './core/interceptors/error.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [ConfigModule.forRoot(), HealthCheckModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }],
})
export class AppModule {}
