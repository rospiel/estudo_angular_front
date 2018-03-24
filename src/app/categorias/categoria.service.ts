import { Injectable } from '@angular/core';
import { /* Http, Headers */ } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8090/categorias';

  constructor(private http: AuthHttp) { }

  pesquisarTodos(): Promise<any> {
    /* const headers = new Headers(); */
    /* headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); */

    return this.http.get(this.categoriasUrl, { /* headers */ }).toPromise().then(
      response => response.json());
    }
  }
