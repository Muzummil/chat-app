// External Dependencies
import { Store } from "@ngrx/store";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { BehaviorSubject, interval, Observable, take } from "rxjs";
// Internal Dependencies
import { MessagesInput } from "@app/shared/models/MessagesInput";
import {
  loadMessagesList,
  loadMoreMessagesList,
} from "../../data-access/state/messages.actions";
import { FetchMoreMessagesFilters } from "../../models/FetchMoreMessagesFilters";
import { Message } from "@app/chat/features/messages-module/models/MessagesList";
import { MessagesListState } from "@app/chat/features/messages-module/models/MessagesListState";
import { messagesList } from "@app/chat/features/messages-module/data-access/state/messages.selectors";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {
  /**
   * Local variable used as flag for scroll controlling @type {boolean}
   */
  private forceScrollTop: boolean = false;
  /**
   * Reference of scrolling div container @type {ElementRef}
   */
  @ViewChild("scrollingDiv") scrollingDiv!: ElementRef;
  /**
   * Custom flag to toggle spinner manually @type {BehaviourSubject<boolean>}
   */
  public showLoadeMoreSpinner$ = new BehaviorSubject<boolean>(false);
  /**
   * Local copy of dropdownValues {@Input MessagesInput}
   */
  public _dropdownValues!: MessagesInput;
  /**
   * Setter function for Input received from ChatWrapper component of @type {@Input MessagesInput}
   */
  @Input() set dropdownValues(value: MessagesInput) {
    this._dropdownValues = value;
  }
  /**
   * Getter function for Input received from ChatWrapper component of @type {@Input MessagesInput}
   */
  get dropdownValues(): MessagesInput {
    return this._dropdownValues;
  }
  /**
   * Messages List Component Constructor
   * @param {Store<MessagesListState>} _store
   */
  constructor(private readonly _store: Store<MessagesListState>) {}
  /**
   * Messages List Data Observable of @type Observable<Message[]>
   * Pipe & Map @returns Messages[]
   */
  public messagesListState$: Observable<MessagesListState> =
    this._store.select(messagesList);
  /**
   * On any change in @Input value lifecycle method
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.loadMessagesList();
  }
  /**
   * On Component Load lifecycle method
   */
  ngOnInit() {
    this.loadMessagesList();
  }
  /**
   * After View lifecycle method
   */
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  /**
   * Loads the list of latest messages
   */
  loadMessagesList(): void {
    this._store.dispatch(loadMessagesList({ filters: this._dropdownValues }));
  }
  /**
   * Tracks each message of array based on datetime field
   * @returns {string} messageDateTime a unique value for each message
   */
  trackByDateTime(index: number, message: Message): string {
    return message.datetime;
  }
  /**
   * Load older messages of the list method called from template
   * @params messagesList @type {Array<Message> | undefined}
   * @params direction @type {"up" | "down"} to determine if older messages are to be checked or newer
   */
  loadMoreMessages(
    messagesList: Array<Message> | undefined,
    direction: "up" | "down" = "up"
  ): void {
    let messageId: string | null = null;
    if (direction === "up") {
      messageId = this.getOldestMessageId(messagesList);
    } else {
      messageId = this.getNewestMessageId(messagesList);
    }
    if (messageId) {
      this.showLoadeMoreSpinner$.next(true);
      this.handleLoadMoreAction(messageId, direction);
    }
  }
  /**
   * Handle logic of loadMore messages
   */
  handleLoadMoreAction(
    oldestMessageId: string,
    direction: "up" | "down"
  ): void {
    const payload: FetchMoreMessagesFilters = {
      old: direction === "up" ? true : false,
      messageId: oldestMessageId,
      channelId: this._dropdownValues.selectedChannelId,
    };
    this._store.dispatch(loadMoreMessagesList({ filters: payload }));
    interval(2500)
      .pipe(take(1))
      .subscribe(() => {
        this.showLoadeMoreSpinner$.next(false);
        if (direction === "up") {
          this.scrollToTop();
        } else {
          this.scrollToBottom();
        }
      });
  }
  /**
   * getOldest messageId from list of messages
   * @params messagesList @type {Array<Message>}
   * @returns messageId @type {string | null}
   */
  getOldestMessageId(messagesList: Array<Message> | undefined): string | null {
    if (messagesList) {
      const messages: Array<Message> = messagesList;
      const oldestMessageId: string | null =
        messages[messages.length - 1].messageId;
      return oldestMessageId;
    }
    return null;
  }
  /**
   * getNewest messageId from list of messages
   * @params messagesList @type {Array<Message>}
   * @returns messageId @type {string | null}
   */
  getNewestMessageId(messagesList: Array<Message> | undefined): string | null {
    if (messagesList) {
      const messages: Array<Message> = messagesList;
      const newestMessageId: string | null = messages[0].messageId;
      return newestMessageId;
    }
    return null;
  }
  /**
   * Scroll to bottom of the div in order to view latest message
   */
  scrollToBottom(): void {
    try {
      if (!this.forceScrollTop) {
        this.scrollingDiv.nativeElement.scrollTop =
          this.scrollingDiv.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
  /**
   * Scroll to top of the div in order to view old messages
   */
  scrollToTop(): void {
    try {
      this.forceScrollTop = true;
      let element = this.scrollingDiv.nativeElement;
      element.scroll({
        top: 0,
        behavior: "smooth",
      });
      this.toggleForceScrollFlag();
    } catch (err) {}
  }
  /**
   * Toggle local flag so that scroll to bottom can work
   */
  toggleForceScrollFlag(): void {
    interval(2)
      .pipe(take(2))
      .subscribe(() => {
        this.forceScrollTop = false;
      });
  }
}
