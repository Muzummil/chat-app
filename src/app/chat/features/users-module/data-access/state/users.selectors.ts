// External Dependencies
import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from "@ngrx/store";
// Internal Dependencies
import { AppState } from "@app/state/app.state";
import { UsersList } from "@app/chat/features/users-module/models/UsersList";
/**
 * Users State Selector
 * @returns { usersList: UsersList }
 */
export const selectUsers = (state: AppState) => state.usersList;
/**
 * Users List State Selector
 * @returns { UsersListState }
 */
export const usersList:
  | MemoizedSelector<AppState, UsersList, DefaultProjectorFn<UsersList>>
  | any = createSelector(selectUsers, (state: UsersList) => state);
