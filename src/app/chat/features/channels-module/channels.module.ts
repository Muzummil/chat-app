// External Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
// Internal Dependencies
import { ChannelsComponent } from "@app/chat/features/channels-module/ui/channels/channels.component";
import { ChannelsListEffects } from "@app/chat/features/channels-module/data-access/state/channels.effects";
import { channelsListReducer } from "@app/chat/features/channels-module/data-access/state/channels.reducer";
import { ChannelsService } from "@app/chat/features/channels-module/data-access/channels-service/channels.service";

@NgModule({
  declarations: [ChannelsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(channelsListReducer),
    EffectsModule.forFeature([ChannelsListEffects]),
  ],
  providers: [ChannelsService],
  exports: [ChannelsComponent],
})
export class ChannelsModule {}
