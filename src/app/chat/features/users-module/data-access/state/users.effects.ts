// External Dependencies
import { of, from } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
// Internal Dependencies
import {
  loadUsersList,
  loadUsersListSuccess,
  loadUsersListFailure,
} from "@app/chat/features/users-module/data-access/state/users.actions";
import { UsersList } from "@app/chat/features/users-module/models/UsersList";
import { UsersService } from "@app/chat/features/users-module/data-access/users-service/users.service";
/**
 * Users List Effects Class
 */
@Injectable()
export class UsersListEffects {
  /**
   * Users Effects Constructor
   * @param {Actions} _actions$
   * @param {UsersService} _usersService
   */
  constructor(
    private readonly _actions$: Actions,
    private readonly _usersService: UsersService
  ) {}
  /**
   * Effect to load users list from API and returning to reducer
   */
  loadUsersList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUsersList),
      switchMap(() =>
        from(this._usersService.getUsersList()).pipe(
          // Take the returned value and return a new success action containing the UsersList
          map((users: UsersList) => loadUsersListSuccess({ users: users })),
          // Or... if it errors return a new failure action containing the error
          catchError((error: string) => of(loadUsersListFailure({ error })))
        )
      )
    )
  );
}
