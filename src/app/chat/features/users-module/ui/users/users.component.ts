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
import { User } from "@app/chat/features/users-module/models/UsersList";
import { UsersListState } from "@app/chat/features/users-module/models/UsersListState";
import { usersList } from "@app/chat/features/users-module/data-access/state/users.selectors";
import { loadUsersList } from "@app/chat/features/users-module/data-access/state/users.actions";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  /**
   * Users List Component Constructor
   * @param _store @type {Store<UsersListState>}
   */
  constructor(private readonly _store: Store<UsersListState>) {}
  /**
   * Local copy of userId {@Input defaultUserId} @type {string}
   */
  public _defaultUserId!: string;
  /**
   * Setter function for Input received from ChatWrapper component of type {@Input string}
   */
  @Input() set defaultUserId(value: string) {
    this._defaultUserId = value;
  }
  /**
   * Getter function for Input received from ChatWrapper component of type {@Input string}
   */
  get defaultUserId(): string {
    return this._defaultUserId;
  }
  /**
   * Output to update value in parent component @type {EventEmitter}
   */
  @Output() userSelectionChange: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Users List Data Observable of @type Observable<User[]>
   * Pipe & Map @returns User[]
   */
  public usersList$: Observable<User[]> = this._store.select(usersList).pipe(
    map((users: UsersListState) => {
      return users.usersList.users;
    })
  );
  /**
   * On Component Load Lifecycle method
   */
  ngOnInit() {
    this._store.dispatch(loadUsersList());
  }
  /**
   * On user change @type void
   * @parameter event @type {Event}
   */
  changeUser(event: Event): void {
    const userId: string = (event.target as HTMLSelectElement).value;
    if (userId) {
      this._defaultUserId = userId;
      this.userSelectionChange.emit(userId);
    }
  }
}
