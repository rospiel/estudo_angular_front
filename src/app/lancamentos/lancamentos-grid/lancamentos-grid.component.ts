import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  constructor(private lancamentoService: LancamentoService,
              private toasty: ToastyService) { }

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
    });
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
    });
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
