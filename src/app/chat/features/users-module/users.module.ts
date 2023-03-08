// External Dependencies
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";
// Internal Dependencies
import { UsersComponent } from "@app/chat/features/users-module/ui/users/users.component";
import { usersListReducer } from "@app/chat/features/users-module/data-access/state/users.reducer";
import { UsersListEffects } from "@app/chat/features/users-module/data-access/state/users.effects";
import { UsersService } from "@app/chat/features/users-module/data-access/users-service/users.service";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(usersListReducer),
    EffectsModule.forFeature([UsersListEffects]),
  ],
  providers: [UsersService],
  exports: [UsersComponent],
})
export class UsersModule {}
