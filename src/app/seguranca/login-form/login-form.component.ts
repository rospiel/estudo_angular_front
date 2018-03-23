import { Component, OnInit } from '@angular/core';

import { BarraAguardeService } from '../../shared/barra-aguarde/BarraAguardeService.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private barraAguardeService: BarraAguardeService) { }

  ngOnInit() {
    this.barraAguardeService.esconderBarra();
  }

}
