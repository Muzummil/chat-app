// External Dependencies
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
// Internal Dependencies
import { ChannelsList } from "@app/chat/features/channels-module/models/ChannelsList";

@Injectable({
  providedIn: "root",
})
export class ChannelsService {
  /**
   * Get Channels List
   * @returns list of channels @type {ChannelsList}
   */
  getChannels(): ChannelsList {
    const list: ChannelsList = <ChannelsList>{
      channels: [
        { id: "1", name: "General Channel" },
        { id: "2", name: "Technology Channel" },
        { id: "5", name: "LGTM Channel" },
      ],
    };
    return list;
  }
  /**
   * Get Channels List Observable
   * @returns channelsList @type {Observable<ChannelsList>}
   */
  getChannelsList(): Observable<ChannelsList> {
    const list: ChannelsList = this.getChannels();
    return of(list);
  }
}
