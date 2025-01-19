import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ErrorMapperInterceptor } from './infra/interceptors/error-mapper.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ErrorMapperInterceptor());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
