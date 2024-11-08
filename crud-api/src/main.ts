import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

dotenv.config();

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle("Documentação com Swagger - My Playlists")
    .setDescription("Documentação da API - My Playlists.")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token"
    )
    .build();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
