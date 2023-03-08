// External Dependencies
import { createAction, props } from "@ngrx/store";
// Internal Dependencies
import { UsersList } from "@app/chat/features/users-module/models/UsersList";
/**
 * OnLoad Users List
 */
export const loadUsersList = createAction("[UsersList Page] Load Users");
/**
 * OnLoad Users List Success
 * @returns props { users: UsersList }
 */
export const loadUsersListSuccess = createAction(
  "[UsersList API] Users Load Success",
  props<{ users: UsersList }>()
);
/**
 * OnLoad Users List Failure
 * @returns props { error: string }
 */
export const loadUsersListFailure = createAction(
  "[UsersList API] Users Load Failure",
  props<{ error: string }>()
);
