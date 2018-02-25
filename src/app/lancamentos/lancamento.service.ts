import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';
/* Conversor de Data */
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 3;
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
    params = this.validarFiltro(filtro.pagina.toString(), 'page', 'string', params);
    params = this.validarFiltro(filtro.itensPorPagina.toString(), 'size', 'string', params);

    const promessa = this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params }).toPromise().then(
      response => { const responseJson = response.json();
                    const lancamentos = responseJson.content;

                    const resultado = {
                       lancamentos: lancamentos,
                       total: responseJson.totalElements
                    };

                    this.barraAguardeService.esconderBarra();

                    return resultado;
                  }
    );

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

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers }).toPromise().then(() => null);
  }
}
