// External Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Internal Dependencies
import { UsersModule } from "@app/chat/features/users-module/users.module";
import { MessagesModule } from "@app/chat/features/messages-module/messages.module";
import { ChannelsModule } from "@app/chat/features/channels-module/channels.module";
import { ChatRoutingModule } from "@app/chat/chat-routing.module";
import { ChatWrapperComponent } from "@app/chat/on-demand/chat-wrapper/chat-wrapper.component";
import { ChannelNameFromIdPipe } from "@app/chat/pipes/channel-name-from-id.pipe";

@NgModule({
  declarations: [ChatWrapperComponent],
  imports: [
    UsersModule,
    CommonModule,
    ChannelsModule,
    MessagesModule,
    ChatRoutingModule,
    ChannelNameFromIdPipe,
  ],
})
export class ChatModule {}
