import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
    private mutationUrl: string;
    private queryUrl: string;
    private authUrl: string;

    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {
        this.mutationUrl = this.config.get('MUTATION_SERVICE_URL')!;
        this.queryUrl = this.config.get('QUERY_SERVICE_URL')!;
        this.authUrl = this.config.get('AUTH_SERVICE_URL')!; // ✅ AÑADE ESTO
    }

    async forward(method: string, path: string, data?: any, params?: any) {
        const url = this.resolveServiceUrl(method, path) + path;

        const response$ = this.http.request({
            method,
            url,
            data,
            params,
        });

        return firstValueFrom(response$).then(res => res.data);
    }

    private resolveServiceUrl(method: string, path: string): string {
        if (path.startsWith('/auth')) return this.authUrl; // ✅ CAMBIA AQUI
        if (method === 'GET') return this.queryUrl;
        return this.mutationUrl;
    }
}

