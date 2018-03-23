import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';

@Injectable()
export class AutenticacaoService {

  oauthTokenUrl = 'http://localhost:8090/oauth/token';
  jwtPayload: any;

  constructor(private http: Http,
              private barraAguardeService: BarraAguardeService,
              private jwtHelper: JwtHelper) {
                this.carregarToken();
              }

  login(usuario: string, senha: string): Promise<void> {
    this.barraAguardeService.mostrarBarra();
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    const headers = new Headers();

    /* https://www.base64encode.org/ angular:@ngul@0 */
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEAw');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.oauthTokenUrl, body, { headers }).toPromise().then(response => {
      this.armazenarToken(response.json().access_token);
      this.barraAguardeService.esconderBarra();
    }).catch(erro => {
      if (erro.status === 400) {
        const responseJson = erro.json();

        if (responseJson.error === 'invalid_grant') {
          return Promise.reject('Usuário e/ou senha inválida!');
        }
      }

      return Promise.reject(erro);
    });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
