import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TripModuleBase } from "./base/trip.module.base";
import { TripService } from "./trip.service";
import { TripResolver } from "./trip.resolver";

@Module({
  imports: [TripModuleBase, forwardRef(() => AuthModule)],
  providers: [TripService, TripResolver],
  exports: [TripService],
})
export class TripModule {}
