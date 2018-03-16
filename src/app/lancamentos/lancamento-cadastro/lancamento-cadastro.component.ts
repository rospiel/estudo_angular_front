import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { BarraAguardeService } from './../../shared/barra-aguarde/BarraAguardeService.service';

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

  pessoas = [
    { label: 'Cauê André Castro', value: 1 },
    { label: 'Pedro Henrique Benjamin Vitor Rocha', value: 2 },
    { label: 'Isabel Marina Brenda Barros', value: 3 }
  ];

  constructor(private categoriaService: CategoriaService,
              private errorHandlerService: ErrorHandlerService,
              private barraAguardeService: BarraAguardeService) { }

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
    this.barraAguardeService.esconderBarra();

  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodos().then(categorias => {
      this.categorias = categorias.map(categoria => {
        return { label: categoria.nome, value: categorias.codigo };
      });
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

}
