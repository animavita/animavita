import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerDocumentOptions } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerSettings = new DocumentBuilder()
    .setTitle('Swagger Animavita')
    .setDescription(
      'This is a sample server Animavita server. You can find out more about Swagger at [http://swagger.io](http://swagger.io).',
    )
    .setVersion('1.0.0')
    .setTermsOfService('http://swagger.io/terms/')
    .setLicense(
      'GNU General Public License v2.0',
      'https://github.com/animavita/animavita/blob/v2/LICENSE.md',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerSettings,
    swaggerDocumentOptions,
  );
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
