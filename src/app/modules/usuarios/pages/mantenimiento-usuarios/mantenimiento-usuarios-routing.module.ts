import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarUsuariosComponent } from './pages/mostrar-usuarios/mostrar-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: MostrarUsuariosComponent
  },
  {
    path:'**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class MantenimientoUsuariosRoutingModule { }
