import { Module } from '@nestjs/common'
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [HealthCheckModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
