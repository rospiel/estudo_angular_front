import { Component, OnInit } from '@angular/core';

import { AutenticacaoService } from '../../seguranca/autenticacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
  }

}
