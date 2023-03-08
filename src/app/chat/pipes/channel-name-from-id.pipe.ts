// External Dependencies
import { Pipe, PipeTransform } from "@angular/core";
// Internal Dependencies
import {
  Channel,
  ChannelsList,
} from "@app/chat/features/channels-module/models/ChannelsList";
import { ChannelsService } from "@app/chat/features/channels-module/data-access/channels-service/channels.service";

@Pipe({
  name: "channelNameFromId",
  standalone: true,
})
export class ChannelNameFromIdPipe implements PipeTransform {
  /**
   * ChannelNameFromIdPipe constructor having @params _channelsService of @type {ChannelsService}
   */
  constructor(private readonly _channelsService: ChannelsService) {}
  /**
   * Pipe method receiving channelId as @params channelId of @type {string}
   * @returns {string} channelName
   */
  transform(channelId: string): string {
    const channelsList: ChannelsList = this._channelsService.getChannels();
    const filteredChannel: Channel = channelsList.channels.filter(
      (res: Channel) => res.id === channelId
    )[0];
    return filteredChannel.name;
  }
}
