import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    //Routes
    AuthRoutingModule,

    //Material Design
    PrimeNgModule,
    AngularMaterialModule,

  ]
})
export class AuthModule { }
