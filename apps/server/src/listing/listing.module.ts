import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ListingModuleBase } from "./base/listing.module.base";
import { ListingService } from "./listing.service";
import { ListingResolver } from "./listing.resolver";

@Module({
  imports: [ListingModuleBase, forwardRef(() => AuthModule)],
  providers: [ListingService, ListingResolver],
  exports: [ListingService],
})
export class ListingModule {}
