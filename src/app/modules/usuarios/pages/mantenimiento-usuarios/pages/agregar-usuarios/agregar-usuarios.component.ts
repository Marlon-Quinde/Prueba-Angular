import { Component } from '@angular/core';
import { UsuarioInterface } from 'src/app/modules/auth/interfaces/usuario.interface';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MantenimientoUsuariosService } from '../../services/mantenimiento-usuarios.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras } from '@angular/router';
import { ResponseInterface } from '../../interfaces/responseUsuario.interfaces';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class AgregarUsuariosComponent {
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z0-9ñ._-]*$/;

  constructor(private service:MantenimientoUsuariosService ,private confirmationService: ConfirmationService, private messageService: MessageService,private dialogRef: MatDialogRef<AgregarUsuariosComponent>){}
  //usuario: UsuarioInterface = [];

  usuario = new FormGroup({
    nombre: new FormControl('',Validators.required),
    apellido: new FormControl('',Validators.required),
    usuario: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    clave: new FormControl('',Validators.required),
  });

  verificar() {
    if (this.usuario.valid) {
      this.confirmationService.confirm({
        message: '¿Desea agregar a '+this.usuario.value.nombre+' '+this.usuario.value.apellido+' al sistema?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.agregar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique los datos primero.'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Datos no agregados.' });
                    break;
            }
        }
    });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe llenar todos los campos.' });
    }
  }
  
  
  agregar(){
    let objToSend: NavigationExtras = {
      queryParams: {
        nombre: this.usuario.value.nombre,
        apellido: this.usuario.value.apellido,
        usuario: this.usuario.value.usuario,
        correo: this.usuario.value.correo,
        clave: this.usuario.value.clave
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.setData(objToSend.queryParams as UsuarioInterface).subscribe((data:ResponseInterface ) =>{
      this.messageService.add({severity: 'info', summary: 'Codigo: '+data.status, detail: 'Estado: '+data.message });
    }),(error: BackErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.code , detail: error.error.message });
      
    };
  }


  limpiar(){
    this.usuario.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
