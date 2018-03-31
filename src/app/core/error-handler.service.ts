import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ToastyService } from 'ng2-toasty';

import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';


@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService,
              private barraAguardeService: BarraAguardeService) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else if (errorResponse instanceof Response  && ( errorResponse.status >= 400 && errorResponse.status < 500 )) {
      let erros;
      erros = errorResponse.json();

      if (erros[0]) {
        mensagem = erros[0].mensagem ? erros[0].mensagem : 'Erro ao processar serviço remoto. Tente novamente.';
        console.log('Ocorreu um erro: ', erros[0].mensagemDesenvolvedor ? erros[0].mensagemDesenvolvedor :
                                                                    'Erro ao processar serviço remoto. Tente novamente.');
      } else if (errorResponse.status === 403) {
        mensagem = 'Sem permissão para executar esta ação!';
      } else {
        mensagem = 'Erro ao processar serviço remoto. Tente novamente.';
        console.log('Ocorreu um erro: ', errorResponse);
      }

    } else {
      mensagem = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro: ', errorResponse);
    }

    this.toasty.error(mensagem);
    this.barraAguardeService.esconderBarra();

  }

}
