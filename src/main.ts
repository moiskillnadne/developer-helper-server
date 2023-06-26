import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.APP_PORT || 3000
  const globalPrefix = process.env.GLOBAL_PREFIX || 'api'

  app.enableCors({
    origin: ['http://localhost:5173', 'https://developer-helper.ru'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['Content-Disposition'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })

  app.setGlobalPrefix(globalPrefix, {
    exclude: [],
  })

  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Developer Helper API')
    .setDescription('Developer Helper API Documentation')
    .setVersion('1.0')
    .addTag('DeveloperHelper')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(port)
}
bootstrap()
