import { UtilityService } from "./../../../shared/data-access/utility-service/utility.service";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MessagesInput } from "@app/shared/models/MessagesInput";

@Component({
  selector: "app-chat-wrapper",
  templateUrl: "./chat-wrapper.component.html",
  styleUrls: ["./chat-wrapper.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWrapperComponent {
  constructor(private readonly _utilityService: UtilityService) {}
  public selectedUserId: string = this._utilityService.getDefaultUserId();
  public selectedChannelId: string = this._utilityService.getDefaultChannelId();
  public selectedFields: MessagesInput = {
    selectedUserId: this.selectedUserId,
    selectedChannelId: this.selectedChannelId,
  };
  onUserChange(userId: string): void {
    console.log("Changed", userId);
    this.selectedUserId = userId;
    this.selectedFields = {
      selectedUserId: userId,
      selectedChannelId: this.selectedChannelId,
    };
  }
  onChannelChange(channelId: string): void {
    console.log("Changed", channelId);
    this.selectedChannelId = channelId;
    this.selectedFields = {
      selectedChannelId: channelId,
      selectedUserId: this.selectedUserId,
    };
  }
}
