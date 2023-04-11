import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,

    //Routes
    UsuariosRoutingModule,


    //Material Design
    PrimeNgModule,
    AngularMaterialModule
  ]
})
export class UsuariosModule { }
