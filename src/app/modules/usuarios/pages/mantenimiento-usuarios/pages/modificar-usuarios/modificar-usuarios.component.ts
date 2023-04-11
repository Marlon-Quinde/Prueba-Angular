import { Component, Inject, OnInit } from '@angular/core';
import { UsuarioInterface } from 'src/app/modules/auth/interfaces/usuario.interface';
import { MantenimientoUsuariosService } from '../../services/mantenimiento-usuarios.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';
import { ResponseInterface } from '../../interfaces/responseUsuario.interfaces';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.component.html',
  styleUrls: ['./modificar-usuarios.component.css'],
  providers:[ ConfirmationService, MessageService ]
})
export class ModificarUsuariosComponent implements OnInit {
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z0-9ñ._-]*$/;

  constructor(private service:MantenimientoUsuariosService ,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService, 
              private dialogRef: MatDialogRef<ModificarUsuariosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UsuarioInterface ){}
  usuario: UsuarioInterface = this.data;

  ngOnInit(): void {
    console.log(this.data)
  }
  usuariosUp = new FormGroup({
    nombre: new FormControl(this.usuario.nombre,Validators.required),
    apellido: new FormControl(this.usuario.apellido,Validators.required),
    usuario: new FormControl(this.usuario.usuario,Validators.required),
    clave: new FormControl(this.usuario.clave,Validators.required),
    correo: new FormControl(this.usuario.correo,Validators.required),
  });

  verificar() {
    if (this.usuariosUp.valid) {
      this.confirmationService.confirm({
        message: '¿Desea modificar los datos de '+this.usuario.nombre+' '+this.usuario.apellido,
        header: 'Advertencia',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modificar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique los datos antes de modificar.'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Datos no modificados.' });
                    break;
            }
        }
    });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe llenar todos los campos.' });
    }
  }
  
  
  modificar(){
    let objToSend: NavigationExtras = {
      queryParams: {
        id: this.usuario.id,
        nombre: this.usuariosUp.value.nombre,
        apellido: this.usuariosUp.value.apellido,
        usuario: this.usuariosUp.value.usuario,
        clave: this.usuariosUp.value.clave,
        correo: this.usuariosUp.value.correo,
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.updData(objToSend.queryParams as UsuarioInterface).subscribe((data:ResponseInterface) =>{
      this.messageService.add({severity: 'info', summary: 'Codigo: '+data.status, detail: 'Estado: '+data.message });
    }),(error: BackErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.code , detail: error.error.message });
      
    };
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }

  limpiar(){
    this.usuariosUp.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
