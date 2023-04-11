import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarUsuariosComponent } from './pages/mostrar-usuarios/mostrar-usuarios.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { MantenimientoUsuariosRoutingModule } from './mantenimiento-usuarios-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgregarUsuariosComponent } from './pages/agregar-usuarios/agregar-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModificarUsuariosComponent } from './pages/modificar-usuarios/modificar-usuarios.component';



@NgModule({
  declarations: [
    MostrarUsuariosComponent,
    InicioComponent,
    AgregarUsuariosComponent,
    ModificarUsuariosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    //Routes
    MantenimientoUsuariosRoutingModule,

    //Material Design
    PrimeNgModule,
    AngularMaterialModule
  ]
})
export class MantenimientoUsuariosModule { }
