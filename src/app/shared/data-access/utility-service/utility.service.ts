// External Dependencies
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  /**
   * Get the default user id to be used initially
   * @returns {string} userId
   */
  getDefaultUserId(): string {
    return "Joyse";
  }
  /**
   * Get the default channel id to be used initially
   * @returns {string} channelId
   */
  getDefaultChannelId(): string {
    return "1";
  }
}
