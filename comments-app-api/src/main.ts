import { NestFactory } from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Comments-app api')
      .setVersion('1.0')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  await app.listen(5001);
}

bootstrap();
