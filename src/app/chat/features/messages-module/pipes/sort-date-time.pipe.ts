// External Dependencies
import { Pipe, PipeTransform } from "@angular/core";
// Internal Dependencies
import { Message } from "../models/MessagesList";

@Pipe({
  name: "sortDateTime",
  standalone: true,
})
export class SortDateTimePipe implements PipeTransform {
  transform(value: Message[]): Message[] {
    // Created the shallow copy of the messages array so that original array issue doesn't happen
    value = value.slice();
    return value.sort((a: Message, b: Message) => {
      const aDate: Date = new Date(a.datetime);
      const bDate: Date = new Date(b.datetime);
      return aDate.getTime() - bDate.getTime();
    });
  }
}
