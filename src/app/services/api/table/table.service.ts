import { Service } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';
import { TableResponse } from '../../../interfaces/responses/tables/table-response';
import { CreateTableReponseInterface } from '../../../interfaces/responses/tables/create-table-response';

@Service()
export class TableService extends ServerApiService {

    public getAllTables(): Observable<TableResponse> {
        return this.get<TableResponse>("table/get");
    }

    public createTable(name: string): Observable<CreateTableReponseInterface> {
        return this.post<CreateTableReponseInterface>("table/create", {
            name: name
        });
    }
}