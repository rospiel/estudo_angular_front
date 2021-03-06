import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { BarraAguardeService } from './../../shared/barra-aguarde/BarraAguardeService.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { AutenticacaoService } from '../../seguranca/autenticacao.service';

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
  tituloPagina: string;
  formulario: FormGroup;



  constructor(private categoriaService: CategoriaService,
              private errorHandlerService: ErrorHandlerService,
              private barraAguardeService: BarraAguardeService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toastyService: ToastyService,
              /* Se faz necessário pra captar parâmetros passados na rota */
              private rota: ActivatedRoute,
              private redirecionar: Router,
              private titulo: Title,
              private autenticacaoService: AutenticacaoService,
              private formBuilder: FormBuilder) { }

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

    this.configurarFormulario();
    this.titulo.setTitle('Novo Lançamento');
    this.tituloPagina = 'Cadastro de Lançamento';
    const codigoLancamento = this.rota.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
      this.tituloPagina = 'Edição de Lançamento';
      this.titulo.setTitle('Edição de Lançamento');
    }

    this.carregarCategorias();
    this.carregarPessoas();
    this.validarAutorizacao();
    this.barraAguardeService.esconderBarra();

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [ null ],
      tipoLancamento: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [ null ],
      descricao: [ null, [ Validators.required, Validators.minLength(5) ] ],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: [ null ]
       }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }) ,
      observacao: []
    });
  }

  validarAutorizacao() {
    if (this.autenticacaoService.verificarPermissao('ROLE_CADASTRAR_LANCAMENTO') === false) {
      this.formulario.get('tipoLancamento').disable();
      this.formulario.get('dataVencimento').disable();
      this.formulario.get('dataPagamento').disable();
      this.formulario.get('descricao').disable();
      this.formulario.get('valor').disable();
      this.formulario.get('pessoa').disable();
      this.formulario.get('categoria').disable();
      this.formulario.get('observacao').disable();
    }
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.pesquisarPorCodigo(codigo).then(lancamento => {
      this.formulario.patchValue(lancamento);
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

  submeter() {
    if (this.formulario.get('codigo').value) {
      this.editar();
    } else {
      this.salvar();
    }
  }

  novo() {
    this.formulario.reset();

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

  salvar() {
    this.barraAguardeService.mostrarBarra();
    this.lancamentoService.adicionar(this.formulario.value).then(lancamentoAdicionado => {
      this.toastyService.success('Lançamento adicionado com sucesso!');
      this.barraAguardeService.esconderBarra();
      this.redirecionar.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  editar() {
    this.barraAguardeService.mostrarBarra();
    this.lancamentoService.editar(this.formulario.value).then(lancamento => {
      this.formulario.patchValue(lancamento);
      this.toastyService.success('Lançamento alterado com sucesso!');
      this.barraAguardeService.esconderBarra();
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
