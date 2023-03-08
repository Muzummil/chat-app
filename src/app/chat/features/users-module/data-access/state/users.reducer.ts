// External Dependencies
import { createFeature, createReducer, on } from "@ngrx/store";
// Internal Dependencies
import {
  loadUsersList,
  loadUsersListSuccess,
  loadUsersListFailure,
} from "./users.actions";
import { UsersListState } from "@app/chat/features/users-module/models/UsersListState";
/**
 * Users List Initial State
 */
export const initialState: UsersListState = {
  usersList: { users: [] },
  error: null,
};
/**
 * Users List Reducer
 */
export const usersListReducer = createFeature({
  // Supply the initial state
  name: "usersList",
  reducer: createReducer(
    initialState,
    on(loadUsersList, (state) => ({ ...state })),
    // Handle successfully loaded users list
    on(loadUsersListSuccess, (state, { users }) => ({
      ...state,
      usersList: users,
      error: null,
    })),
    // Handle users list load failure
    on(loadUsersListFailure, (state, { error }) => ({
      ...state,
      error: error,
    }))
  ),
});
