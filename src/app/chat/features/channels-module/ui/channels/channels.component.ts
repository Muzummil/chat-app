// External Dependencies
import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
// Internal Dependencies
import { Channel } from "@app/chat/features/channels-module/models/ChannelsList";
import { channelsList } from "@app/chat/features/channels-module/data-access/state/channels.selectors";
import { ChannelsListState } from "@app/chat/features/channels-module/models/ChannelsListState";
import { loadChannelsList } from "@app/chat/features/channels-module/data-access/state/channels.actions";
@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsComponent implements OnInit {
  /**
   * Local copy of channelId {@Input defaultChannelId} @type {string}
   */
  public _defaultChannelId!: string;
  /**
   * Setter function for Input received from ChatWrapper component of type {@Input string}
   */
  @Input() set defaultChannelId(value: string) {
    this._defaultChannelId = value;
  }
  /**
   * Getter function for Input received from ChatWrapper component of type {@Input string}
   */
  get defaultChannelId(): string {
    return this._defaultChannelId;
  }
  /**
   * Output to update value in parent component @type {EventEmitter}
   */
  @Output() channelSelectionChange: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Channels List Component Constructor
   * @param {Store<ChannelsListState>} _store
   */
  constructor(private readonly _store: Store<ChannelsListState>) {}
  /**
   * Channels List Data Observable of @type Observable<Channel[]>
   * Pipe & Map @returns Channel[]
   */
  public channelsList$: Observable<Channel[]> = this._store
    .select(channelsList)
    .pipe(
      map((channels: ChannelsListState) => {
        return channels.channelsList.channels;
      })
    );
  /**
   * On Component Load Lifecycle method
   */
  ngOnInit() {
    this._store.dispatch(loadChannelsList());
  }
  /**
   * On Channel Change @type void
   * @parameter channelId of tye string
   */
  changeChannel(channelId: string): void {
    this.channelSelectionChange.emit(channelId);
  }
  /**
   * Tracks each channel of array based on channelId
   * @returns {string} channelId a unique value for each channel
   */
  trackByChannelId(index: number, channel: Channel): string {
    return channel.id;
  }
}
