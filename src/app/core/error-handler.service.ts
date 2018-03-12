import { Injectable } from '@angular/core';

import { BarraAguardeService } from '../shared/barra-aguarde/BarraAguardeService.service';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService,
              private barraAguardeService: BarraAguardeService) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else {
      mensagem = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro: ', errorResponse);
    }

    this.toasty.error(mensagem);
    this.barraAguardeService.esconderBarra();

  }

}
