import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WishlistModuleBase } from "./base/wishlist.module.base";
import { WishlistService } from "./wishlist.service";
import { WishlistResolver } from "./wishlist.resolver";

@Module({
  imports: [WishlistModuleBase, forwardRef(() => AuthModule)],
  providers: [WishlistService, WishlistResolver],
  exports: [WishlistService],
})
export class WishlistModule {}
