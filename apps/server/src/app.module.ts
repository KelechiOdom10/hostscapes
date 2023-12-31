import { Module } from "@nestjs/common";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { LoggerModule } from "nestjs-pino";
import { UserModule } from "./user/user.module";
import { ListingModule } from "./listing/listing.module";
import { WishlistModule } from "./wishlist/wishlist.module";
import { TripModule } from "./trip/trip.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  controllers: [],
  imports: [
    ACLModule,
    AuthModule,
    UserModule,
    ListingModule,
    WishlistModule,
    TripModule,
    HealthModule,
    PrismaModule,
    SecretsManagerModule,
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.graphql",
      sortSchema: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
