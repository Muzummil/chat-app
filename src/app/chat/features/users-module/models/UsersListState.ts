// Internal Dependencies
import { UsersList } from "@app/chat/features/users-module/models/UsersList";
/**
 * Users List State Interface
 */
export interface UsersListState {
  usersList: UsersList;
  error: string | null;
}
