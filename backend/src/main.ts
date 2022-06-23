import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  const config_env = app.get(ConfigService);
  // เพิ่ม path /api/ ก่อนไป path อื่น
  app.setGlobalPrefix('api');

  /**
   * ถ้าไม่ใช่ production ให้มี swagger
   */
  if (config_env.get('NODE_ENV') !== 'production') {
    // document description
    const config = new DocumentBuilder()
      .setTitle('JJStore')
      .setDescription('The JJStore API description')
      .setVersion('1.0')
      .addTag('...')
      .build();
    // create swagger module เป็นการสร้าง module ของ swagger
    const document = SwaggerModule.createDocument(app, config);
    // setting Swagger
    SwaggerModule.setup('docs', app, document);
  }
  // run port
  await app.listen(config_env.get('PORT'));
  console.log();
  console.log(
    `Application is running on: ${await app.getUrl()}/api or localhost:${config_env.get(
      'PORT',
    )}/api`,
  );
  console.log(
    `swagger is running on: ${await app.getUrl()}/docs or localhost:${config_env.get(
      'PORT',
    )}/docs`,
  );
}
bootstrap();
