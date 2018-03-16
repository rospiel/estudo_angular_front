import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { BarraAguardeService } from './../../shared/barra-aguarde/BarraAguardeService.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pt: any;
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento;

  constructor(private categoriaService: CategoriaService,
              private errorHandlerService: ErrorHandlerService,
              private barraAguardeService: BarraAguardeService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toastyService: ToastyService) { }

  ngOnInit() {
    this.pt = {
      firstDayOfWeek: 1,
      dayNames: [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ],
      dayNamesShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      today: 'Hoje',
      clear: 'Limpar'
    };

    this.carregarCategorias();
    this.carregarPessoas();
    this.barraAguardeService.esconderBarra();

  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodos().then(categorias => {
      this.categorias = categorias.map(categoria => {
        return { label: categoria.nome, value: categoria.codigo };
      });
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.pesquisarTodos().then(pessoas => {
      this.pessoas = pessoas.pessoas.map(pessoa => {
        return { label: pessoa.nome, value: pessoa.codigo };
      });
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    this.barraAguardeService.mostrarBarra();
    this.lancamentoService.adicionar(this.lancamento).then(() => {
      this.toastyService.success('Lançamento adicionado com sucesso!');
      form.reset();
      this.lancamento = new Lancamento();
      this.barraAguardeService.esconderBarra();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
