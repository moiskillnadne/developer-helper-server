import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.APP_PORT || 3000
  const globalPrefix = process.env.GLOBAL_PREFIX || 'api'

  app.setGlobalPrefix(globalPrefix, {
    exclude: [],
  })

  await app.listen(port)
}
bootstrap()
