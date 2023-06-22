import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthCheckController {
  @Get('healthcheck')
  public check(): string {
    return 'OK'
  }
}
