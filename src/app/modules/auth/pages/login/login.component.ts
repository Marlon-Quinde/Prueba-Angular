import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  hide = true;
  usuarioTemp: string = '';
  constructor(private MessageService: MessageService,private service: AuthService, private router: Router) { }

  sesionControl = new FormGroup({
    usuario: new FormControl('',Validators.required),
    clave: new FormControl('',Validators.required),
  })

  onSubmit(){
    this.usuarioTemp = this.sesionControl.value.usuario!;

    this.service.login(this.sesionControl.value as UsuarioInterface).subscribe((data:any) =>{
      console.log(data);
      localStorage.setItem('userName',this.usuarioTemp);
      localStorage.setItem('token_value',data);
      this.router.navigate(['../../home']);
      this.service.loggedIn.next(true);
    },
    (errorData: HttpErrorResponse) => {
      this.MessageService.add({ severity: 'error', summary: errorData.error.code , detail: errorData.error.message });
    }
    )
  }  
}
