import { Service } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';
import { RoleResponse } from '../../../interfaces/responses/roles/role-response';

@Service()
export class RoleService extends ServerApiService {
    public getRoles(): Observable<RoleResponse> {
        return this.get<RoleResponse>("role/get");
    }
}
