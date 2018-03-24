import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    /* Necessário para requisições cujo json é enviado */
    globalHeaders: [
      { 'Content-Type': 'Application/json' }
    ]
  });
  return new AuthHttp(config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,

    SegurancaRoutingModule
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  exports: [
    LoginFormComponent
  ]
})
export class SegurancaModule { }
