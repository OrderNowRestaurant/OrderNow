import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Service()
export class ServerApiService {

    private BASE_URL: string = environment.URL_BASE;
    private http = inject(HttpClient);

    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    public connect() {
        return this.http;
    }

    public getUrl(): string {
        return this.BASE_URL.endsWith('/') ? this.BASE_URL : `${this.BASE_URL}/`;
    }

    public post<T>(endpoint: string, body: any) {
        return this.http.post<T>(this.getUrl() + endpoint, body, { headers: this.getHeaders() });
    }

    public get<T>(endpoint: string) {
        return this.http.get<T>(this.getUrl() + endpoint, { headers: this.getHeaders() });
    }

    public put<T>(endpoint: string, body: any) {
        return this.http.put<T>(this.getUrl() + endpoint, body, { headers: this.getHeaders() });
    }

    public delete<T>(endpoint: string) {
        return this.http.delete<T>(this.getUrl() + endpoint, { headers: this.getHeaders() });
    }
}
