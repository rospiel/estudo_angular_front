import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

const rotas: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  /* Rota para satisfazer a busca de lançamento pelo código */
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent }
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
