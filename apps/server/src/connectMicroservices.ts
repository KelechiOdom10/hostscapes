import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export async function connectMicroservices(app: INestApplication) {
  app.get(ConfigService);
}
