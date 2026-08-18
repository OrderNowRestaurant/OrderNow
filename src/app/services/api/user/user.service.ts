import { Service, signal } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../interfaces/responses/users/user-response';
import { UserInterface } from '../../../interfaces/user/user-interface';

@Service()
export class UserService extends ServerApiService {

    private _userList = signal<UserInterface[]>([]);
    readonly userList = this._userList.asReadonly();

    public createUser(user: UserInterface): Observable<UserResponse> {
        return this.post<UserResponse>("user/create", {
            username: user.username,
            password: user.password,
            roleName: user.roleName
        });
    }

    public switchRole(user: UserInterface): Observable<UserResponse> {
        return this.put<UserResponse>("user/change/role", {
            user: user
        });
    }

    public editUser(user: UserInterface & { originalUsername?: string }): Observable<UserResponse> {
        return this.put<UserResponse>("/user/edit", {
            user: user,
            originalUsername: user.originalUsername
        });
    }

    public setUserList(tables: UserInterface[]) {
        this._userList.set(tables);
    }

    public addUser(newTable: UserInterface) {
        this._userList.update((current) => [...(current ?? []), newTable]);
    }

    public updateUser(updatedUser: UserInterface, originalUsername?: string) {
        this._userList.update((current) => (current ?? []).map(u => u.username === (originalUsername ?? updatedUser.username) ? updatedUser : u));
    }
}
