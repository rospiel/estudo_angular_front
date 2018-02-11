import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8090/lancamentos';

  constructor(private http: Http,
              private barraAguardeService: BarraAguardeService) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    this.barraAguardeService.mostrarBarra();

    let params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = this.validarFiltro(filtro.descricao, 'descricao', 'string', params);
    params = this.validarFiltro(filtro.dataVencimentoInicio, 'dataVencimentoDe', 'date', params);
    params = this.validarFiltro(filtro.dataVencimentoFim, 'dataVencimentoAte', 'date', params);

    const promessa = this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params }).toPromise().then(
      response => response.json().content
    );

    promessa.then( () => this.barraAguardeService.esconderBarra() );

    return promessa;

  }

  validarFiltro(filtro: any, nomeFiltro: string, tipoFiltro: string, params: URLSearchParams): URLSearchParams {
    if (filtro) {
      if ('string' === tipoFiltro) {
        params.set(nomeFiltro, filtro);
      } else {
        params.set(nomeFiltro, moment(filtro).format('YYYY-MM-DD') );
      }
    }

    return params;
  }
}
