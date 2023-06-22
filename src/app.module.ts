import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [ConfigModule.forRoot(), HealthCheckModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
