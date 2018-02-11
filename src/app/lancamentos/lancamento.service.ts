import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8090/lancamentos';

  constructor(private http: Http,
              private barraAguardeService: BarraAguardeService) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    this.barraAguardeService.mostrarBarra();

    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    const promessa = this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params }).toPromise().then(
      response => response.json().content
    );

    promessa.then( () => this.barraAguardeService.esconderBarra() );

    return promessa;

  }
}
