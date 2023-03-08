// External Dependencies
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  /**
   * name of the key to be used to save message in localStorage
   */
  private DRAFT_KEY: string = "draft-message";
  /**
   * Set key,value pair in localStorge
   * @param {string} key, @param {string} value
   */
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  /**
   * Get value based on key from localStorge
   * @param {string} key
   * @returns {string | null} value based on existance
   */
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  /**
   * Clears all the values in localStorage
   */
  clearAll(): void {
    localStorage.clear();
  }

  /**
   * Gets saved draft message from localStorge
   * @returns {string | null} value based on existance
   */
  getDraftText(): string | null {
    if (this.getItem(this.DRAFT_KEY)) {
      return this.getItem(this.DRAFT_KEY);
    }
    return null;
  }
  /**
   * Sets draft message in localStorge
   * @param {string} text
   */
  setDraftText(text: string): void {
    this.setItem(this.DRAFT_KEY, text);
  }
}
