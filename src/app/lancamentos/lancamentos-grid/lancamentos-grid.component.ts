import { Component, OnInit, Input } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  constructor(private lancamentoService: LancamentoService) { }

  @Input() lancamentos = [];
  @Input() filtro: LancamentoFiltro;
  @Input() totalRegistros;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).then(lancamentosEncontrados => {
      this.lancamentos = lancamentosEncontrados.lancamentos;
      this.totalRegistros = lancamentosEncontrados.total;
    });
  }

}
