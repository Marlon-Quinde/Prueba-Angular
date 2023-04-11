import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarPerfilesComponent } from './pages/mostrar-perfiles/mostrar-perfiles.component';

const routes: Routes = [
  {
    path:'',
    component: MostrarPerfilesComponent
  },
  {
    path:'**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class MantenimientoPerfilesRoutingModule { }
