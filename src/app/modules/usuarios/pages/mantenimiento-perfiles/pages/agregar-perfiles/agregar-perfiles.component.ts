import { Component } from '@angular/core';
import { MantenimientoPerfilesService } from '../../services/mantenimiento-perfiles.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { PerfilesInterfaces } from '../../interfaces/perfiles.interfaces';
import { ResponsePerfiles } from '../../interfaces/ResponsePerfiles.interfaces';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';

@Component({
  selector: 'app-agregar-perfiles',
  templateUrl: './agregar-perfiles.component.html',
  styleUrls: ['./agregar-perfiles.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class AgregarPerfilesComponent {
  spaceAlphaNum = /^[a-zA-Z ñ]*$/;
  alphaNumChar = /^[a-zA-Z0-9ñ*+,_.@-]*$/;
  alphaNumMChar = /^[a-zA-Z0-9ñ._-]*$/;

  constructor(private service:MantenimientoPerfilesService ,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService,
              private dialogRef: MatDialogRef<AgregarPerfilesComponent> ){}

  perfilUp = new FormGroup({
    descripcion: new FormControl('',Validators.required),
  });

  verificar() {
    if (this.perfilUp.valid) {
      this.confirmationService.confirm({
        message: '¿Desea agregar este perfil ? ',
        header: 'Advertencia',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modificar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique antes de agregar.'});
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
        descripcion: this.perfilUp.value.descripcion
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.setData(objToSend.queryParams as PerfilesInterfaces).subscribe((data:ResponsePerfiles) =>{
      this.messageService.add({severity: 'info', summary: 'Codigo: '+data.status, detail: 'Estado: '+data.message });
    }),(error: BackErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.code , detail: error.error.message });
      
    };
  }

  limpiar(){
    this.perfilUp.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
