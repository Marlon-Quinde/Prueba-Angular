import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { MantenimientoPerfilesRoutingModule } from './mantenimiento-perfiles-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModificarPerfilesComponent } from './pages/modificar-perfiles/modificar-perfiles.component';
import { MostrarPerfilesComponent } from './pages/mostrar-perfiles/mostrar-perfiles.component';
import { AgregarPerfilesComponent } from './pages/agregar-perfiles/agregar-perfiles.component';



@NgModule({
  declarations: [
    ModificarPerfilesComponent,
    MostrarPerfilesComponent,
    AgregarPerfilesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    //Routes
    MantenimientoPerfilesRoutingModule,
    //Material Design
    PrimeNgModule,
    AngularMaterialModule
  ]
})
export class MantenimientoPerfilesModule { }
