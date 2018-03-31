import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { SegurancaGuard } from '../seguranca/seguranca.guard';

const rotas: Routes = [
  {
    path: 'lancamentos',
    component: LancamentosPesquisaComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_PESQUISAR_LANCAMENTO' ] }
  },
  {
    path: 'lancamentos/novo',
    component: LancamentoCadastroComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_CADASTRAR_LANCAMENTO' ] }
  },
  /* Rota para satisfazer a busca de lançamento pelo código */
  { path: 'lancamentos/:codigo',
    component: LancamentoCadastroComponent,
    canActivate: [SegurancaGuard],
    data: { roles: [ 'ROLE_PESQUISAR_LANCAMENTO' ] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas)
  ],
  declarations: [

  ],
  exports: [
    RouterModule
  ]
})
export class LancamentosRoutingModule { }
