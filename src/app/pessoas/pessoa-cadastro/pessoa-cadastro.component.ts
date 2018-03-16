import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { BarraAguardeService } from './../../shared/barra-aguarde/BarraAguardeService.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Pessoa } from '../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private errorHandlerService: ErrorHandlerService,
              private barraAguardeService: BarraAguardeService,
              private pessoaService: PessoaService,
              private toastyService: ToastyService) { }

  ngOnInit() {
    this.barraAguardeService.esconderBarra();
  }

  salvar(form: FormControl) {
    this.barraAguardeService.mostrarBarra();
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa).then(() => {
      this.toastyService.success('Pessoa adicionada com sucesso!');
      form.reset();
      this.pessoa = new Pessoa();
      this.barraAguardeService.esconderBarra();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
