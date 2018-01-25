import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Melissa Hadassa Castro', cidade: 'Maceió', estado: 'AL', status: true },
    { nome: 'Giovanna Yasmin da Silva', cidade: 'Joinville', estado: 'SC', status: true },
    { nome: 'Miguel Hugo Barbosa', cidade: 'Fortaleza', estado: 'CE', status: false },
    { nome: 'Paulo Pedro Ryan Moura', cidade: 'Paulo Afonso', estado: 'BA', status: false },
    { nome: 'Vitória Betina Oliveira', cidade: 'Formosa', estado: 'GO', status: false },
    { nome: 'Raquel Mariane Monteiro', cidade: 'Campo Grande', estado: 'MS', status: true }
  ];

}
