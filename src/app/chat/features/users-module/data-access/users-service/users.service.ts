// External Dependencies
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
// Internal Dependencies
import { UsersList } from "@app/chat/features/users-module/models/UsersList";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  /**
   * Get Users List
   * @returns Observable<UsersList>
   */
  getUsersList(): Observable<UsersList> {
    const list: UsersList = <UsersList>{
      users: [
        { id: "Sam1", name: "Sam" },
        { id: "Russell", name: "Russell" },
        { id: "Joyse", name: "Joyse" },
      ],
    };
    return of(list);
  }
}
