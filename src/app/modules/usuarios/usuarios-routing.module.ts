import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './pages/mantenimiento-usuarios/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: '',
        component: InicioComponent
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/mantenimiento-usuarios/mantenimiento-usuarios.module').then( m => m.MantenimientoUsuariosModule)
        
      },
      {
        path: 'perfiles',
        loadChildren: () => import('./pages/mantenimiento-perfiles/mantenimiento-perfiles.module').then( m => m.MantenimientoPerfilesModule)
      },

    ]
  },
  {
    path: '**',
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
export class UsuariosRoutingModule { }
