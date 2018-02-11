import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class BarraAguardeService {

  constructor() { }

  mostrarBarra() {
    const divAguarde = document.getElementById('fundo') as HTMLDivElement;
    divAguarde.style.display = 'inline';
    return null;
  }

  esconderBarra() {
    const divAguarde = document.getElementById('fundo') as HTMLDivElement;
    divAguarde.style.display = 'none';
    return null;
  }

}
