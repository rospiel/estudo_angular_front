import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  constructor(private pessoasService: PessoaService) { }

  @Input() pessoas = [];
  @Input() filtro: PessoaFiltro;
  @Input() totalRegistros;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro).then(pessoasEncontrados => {
      this.pessoas = pessoasEncontrados.pessoas;
      this.totalRegistros = pessoasEncontrados.total;
    });
  }

}
