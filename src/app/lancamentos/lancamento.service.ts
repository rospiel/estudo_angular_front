import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';


@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8090/lancamentos';

  constructor(private http: Http) { }

  pesquisar(): Promise<any> {

    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    /* Como a chave tem o mesmo nome da variável que guarda o valor basta passar o nome da variável --> { headers: headers }  */
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers }).toPromise().then(response =>
      response.json().content
    );
  }
}
