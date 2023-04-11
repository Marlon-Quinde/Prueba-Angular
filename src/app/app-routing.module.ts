import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then( m => m.UsuariosModule),
    //canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
