import { Service, signal } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../interfaces/responses/users/user-response';
import { UserInterface } from '../../../interfaces/user/user-interface';
import { UserListResponse } from '../../../interfaces/responses/users/user-list-response';

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
        return this.put<UserResponse>("user/edit", {
            username: user.username,
            password: user.password,
            roleName: user.roleName,
            originalUsername: user.originalUsername
        });
    }

    public getUsers(): Observable<UserListResponse> {
        return this.get<UserListResponse>("user/get");
    }

    public deleteUser(username: string): Observable<UserListResponse> {
        return this.post<UserListResponse>("user/delete/"+username);
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
