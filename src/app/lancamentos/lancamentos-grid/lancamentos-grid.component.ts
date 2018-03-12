import { DecimalPipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  constructor(private lancamentoService: LancamentoService,
              private toasty: ToastyService,
              private confirmacao: ConfirmationService,
              private formatadorDecimal: DecimalPipe,
              private errorHandle: ErrorHandlerService) { }

  @Input() lancamentos = [];
  @Input() filtro: LancamentoFiltro;
  @Input() totalRegistros;
  @ViewChild('tabela') grid;
  totalValor: any = 0;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).then(lancamentosEncontrados => {
      this.lancamentos = lancamentosEncontrados.lancamentos;
      this.totalRegistros = lancamentosEncontrados.total;
      this.totalizar();
    }).catch(erro => this.errorHandle.handle(erro));
  }

  excluir(lancamento: any) {
   this.lancamentoService.excluir(lancamento.codigo).then(() => {
      if (this.grid.first === 0) {
        this.filtro.pagina = 0;
        this.lancamentoService.pesquisar(this.filtro).then(lancamentosEncontrados => {
          this.lancamentos = lancamentosEncontrados.lancamentos;
          this.totalRegistros = lancamentosEncontrados.total;
        });
      } else {
        /* Necessário para resetar a posição da pagina do grid e consequentemente fazer a nova pesquisa sem o registro removido */
        this.grid.first = 0;
      }

      this.toasty.success('Lançamento excluído com sucesso!');
    }).catch(erro => this.errorHandle.handle(erro));
  }

  confirmarExclusao(lancamento: any) {
    const valorFormatado = this.formatadorDecimal.transform(lancamento.valor, '1.2-2');

    this.confirmacao.confirm({ message: `Deseja excluir o lançamento da pessoa ${lancamento.pessoa} de valor ${valorFormatado}?`,
                               accept: () => {
                                 this.excluir(lancamento);
                               },
                               reject: () => {
                                 this.totalizar();
                               } });
  }

  totalizar() {
    this.totalValor = 0;
    this.lancamentos.forEach((lancamento: any) => {
      if (lancamento['valor'] != null) {
        this.totalValor = this.totalValor + parseFloat(lancamento['valor']);
      }
    });
  }

}
