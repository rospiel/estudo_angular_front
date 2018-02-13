import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8090/pessoas';

  constructor(private http: Http,
              private barraAguardeService: BarraAguardeService) { }

  pesquisarTodos(): Promise<any> {
    this.barraAguardeService.mostrarBarra();

    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    const promessa = this.http.get(this.pessoasUrl, { headers }).toPromise().then(
      response => { const responseJson = response.json();
                    const pessoas = responseJson.content;

                    const resultado = {
                      pessoas: pessoas,
                      total: responseJson.totalElements
                    };

                    this.barraAguardeService.esconderBarra();

                    return resultado;
      }
    );

    return promessa;

  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    this.barraAguardeService.mostrarBarra();

    let params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = this.validarFiltro(filtro.nome, 'nome', params);
    params = this.validarFiltro(filtro.pagina.toString(), 'page', params);
    params = this.validarFiltro(filtro.itensPorPagina.toString(), 'size', params);

    const promessa = this.http.get(`${this.pessoasUrl}/filtro`, { headers, search: params }).toPromise().then(
      response => { const responseJson = response.json();
                    const pessoas = responseJson.content;

                    const resultado = {
                      pessoas: pessoas,
                      total: responseJson.totalElements
                    };

                    this.barraAguardeService.esconderBarra();

                    return resultado;
      }
    );

    return promessa;
  }

  validarFiltro(filtro: any, nomeFiltro: string, params: URLSearchParams): URLSearchParams {
    if (filtro) {
      params.set(nomeFiltro, filtro);
    } else {
      if (nomeFiltro === 'nome') {
        params.set(nomeFiltro, '');
      }
    }

    return params;
  }

}
