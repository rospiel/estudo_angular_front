import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { BarraAguardeService } from './../../shared/barra-aguarde/BarraAguardeService.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { setTimeout } from 'timers';

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
  tituloPagina: string;



  constructor(private categoriaService: CategoriaService,
              private errorHandlerService: ErrorHandlerService,
              private barraAguardeService: BarraAguardeService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toastyService: ToastyService,
              /* Se faz necessário pra captar parâmetros passados na rota */
              private rota: ActivatedRoute,
              private redirecionar: Router) { }

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

    this.tituloPagina = 'Cadastro de Lançamento';
    const codigoLancamento = this.rota.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
      this.tituloPagina = 'Edição de Lançamento';
    }

    this.carregarCategorias();
    this.carregarPessoas();
    this.barraAguardeService.esconderBarra();

  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.pesquisarPorCodigo(codigo).then(lancamento => {
      this.lancamento = lancamento;
    }).catch(erro => this.errorHandlerService.handle(erro));
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

  submeter(form: FormControl) {
    if (this.lancamento.codigo) {
      this.editar(form);
    } else {
      this.salvar(form);
    }
  }

  novo(form: FormControl) {
    form.reset();

    /*
      Necessário visto que na época do desenvolvimento constava um
      bug que ignorava a nova instância de lançamento, incidente
      encontrado no git, aguardando resolução https://github.com/angular/angular/issues/15741
    */
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.redirecionar.navigate(['/lancamentos/novo']);
  }

  salvar(form: FormControl) {
    this.barraAguardeService.mostrarBarra();
    this.lancamentoService.adicionar(this.lancamento).then(lancamentoAdicionado => {
      this.toastyService.success('Lançamento adicionado com sucesso!');
      this.barraAguardeService.esconderBarra();
      this.redirecionar.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  editar(form: FormControl) {
    this.barraAguardeService.mostrarBarra();
    this.lancamentoService.editar(this.lancamento).then(lancamento => {
      this.lancamento = lancamento;
      this.toastyService.success('Lançamento alterado com sucesso!');
      this.barraAguardeService.esconderBarra();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
