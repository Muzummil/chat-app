// External Dependencies
import { Store } from "@ngrx/store";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
// Internal Dependencies
import { MessagesInput } from "@app/shared/models/MessagesInput";
import { NewMessage } from "@app/chat/features/messages-module/models/NewMessage";
import { StorageService } from "@app/shared/data-access/storage-service/storage.service";
import { MessagesListState } from "@app/chat/features/messages-module/models/MessagesListState";
import { updateMessagesList } from "@app/chat/features/messages-module/data-access/state/messages.actions";

@Component({
  selector: "app-create-message",
  templateUrl: "./create-message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMessageComponent {
  /**
   * Local copy of @Input dropdownValues @type {MessagesInput}
   */
  public _dropdownValues!: MessagesInput;
  /**
   * Setter function for Input received from MessagesComponent component of @type {@Input MessagesInput}
   */
  @Input() set dropdownValues(values: MessagesInput) {
    this._dropdownValues = values;
  }
  /**
   * Getter function for Input received from MessagesComponent component of @type {@Input MessagesInput}
   */
  get dropdownValues(): MessagesInput {
    return this._dropdownValues;
  }
  /**
   * Two Way Binded value of typed message @type {string | null} if default text is saved in storage
   */
  public newMessageText: string | null = this._storageService.getDraftText();
  /**
   * CreateMessageComponent Component Constructor
   * @param _storageService @type {StorageService}
   * @param _store @type {Store<MessagesListState>}
   */
  constructor(
    private readonly _storageService: StorageService,
    private readonly _store: Store<MessagesListState>
  ) {}
  /**
   * Send New Message on Send Button Click
   */
  sendNewMessage(): void {
    if (this.newMessageText) {
      this.updateMessagesListState(this.newMessageText);
    }
  }
  /**
   * Upate the messages list of state with newly added message
   * messageText @parameter of type string
   */
  updateMessagesListState(messageText: string): void {
    const newMessage: NewMessage = {
      status: "Sending",
      text: messageText,
      userId: this._dropdownValues.selectedUserId,
      channelId: this._dropdownValues.selectedChannelId,
    };
    this._store.dispatch(updateMessagesList({ newMessage: newMessage }));
    this.newMessageText = null;
    this._storageService.clearAll();
  }
  /**
   * Saves the text as draft in storage
   */
  saveTextAsDraft(): void {
    if (this.newMessageText !== null) {
      this._storageService.setDraftText(this.newMessageText);
    }
  }
}
