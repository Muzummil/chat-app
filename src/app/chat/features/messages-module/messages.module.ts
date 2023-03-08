// External Dependencies
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { ApolloModule } from "apollo-angular";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
// Internal Dependencies
import { SharedModule } from "@app/shared/shared.module";
import { GraphQLModule } from "@app/chat/features/messages-module/graphql.module";
import { SharedServicesModule } from "@app/shared/data-access/shared-services.module";
import { SortDateTimePipe } from "@app/chat/features/messages-module/pipes/sort-date-time.pipe";
import { MessagesComponent } from "@app/chat/features/messages-module/ui/messages/messages.component";
import { messagesListReducer } from "@app/chat/features/messages-module/data-access/state/messages.reducer";
import { MessagesListEffects } from "@app/chat/features/messages-module/data-access/state/messages.effects";
import { MessagesService } from "@app/chat/features/messages-module/data-access/messages-service/messages.service";
import { MessageCardComponent } from "@app/chat/features/messages-module/ui/messages/message-card/message-card.component";
import { CreateMessageComponent } from "@app/chat/features/messages-module/ui/messages/create-message/create-message.component";

@NgModule({
  declarations: [
    MessagesComponent,
    MessageCardComponent,
    CreateMessageComponent,
  ],
  imports: [
    CommonModule,
    ApolloModule,
    FormsModule,
    SharedModule,
    GraphQLModule,
    SortDateTimePipe,
    HttpClientModule,
    SharedServicesModule,
    StoreModule.forFeature(messagesListReducer),
    EffectsModule.forFeature([MessagesListEffects]),
  ],
  providers: [MessagesService],
  exports: [MessagesComponent, CreateMessageComponent],
})
export class MessagesModule {}
