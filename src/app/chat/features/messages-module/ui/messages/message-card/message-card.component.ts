// External Dependencies
import { Input } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
// Internal Dependencies
import { Message } from "@app/chat/features/messages-module/models/MessagesList";
@Component({
  selector: "app-message-card",
  templateUrl: "./message-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageCardComponent {
  /**
   * @Input from MessagesComponent to show individual message
   */
  @Input() message: Message | null = null;
  /**
   * Local copy of selectedUserId @Input @type {string}
   */
  public _selectedUserId!: string;
  /**
   * Setter function for Input received from MessagesComponent component of @type {@Input string}
   */
  @Input() set selectedUserId(value: string) {
    this._selectedUserId = value;
  }
  /**
   * Getter function for Input received from MessagesComponent component of @type {@Input string}
   */
  get selectedUserId(): string {
    return this._selectedUserId;
  }
}
