import { Service, signal } from '@angular/core';
import { ServerApiService } from '../server/server-api.service';
import { Observable } from 'rxjs';
import { TableResponse } from '../../../interfaces/responses/tables/table-response';
import { CreateTableReponseInterface } from '../../../interfaces/responses/tables/create-table-response';
import { TableInterface } from '../../../interfaces/table/table-interface';
import { UpdateTableResponseInterface } from '../../../interfaces/responses/tables/update-table-response';

@Service()
export class TableService extends ServerApiService {
    private _tableList = signal<TableInterface[]>([]);
    readonly tableList = this._tableList.asReadonly();

    public getAllTables(): Observable<TableResponse> {
        return this.get<TableResponse>("table/get");
    }

    public createTable(name: string): Observable<CreateTableReponseInterface> {
        return this.post<CreateTableReponseInterface>("table/create", {
            name: name
        });
    }

    public updateStatus(newStatus: string, table: TableInterface): Observable<UpdateTableResponseInterface> {
        return this.put<UpdateTableResponseInterface>("table/status/update", {
            qrToken: table.qrToken,
            newStatus: newStatus
        });
    }

    public setTables(tables: TableInterface[]) {
        this._tableList.set(tables);
    }

    public addTable(newTable: TableInterface) {
        this._tableList.update((current) => [...current, newTable]);
    }
}