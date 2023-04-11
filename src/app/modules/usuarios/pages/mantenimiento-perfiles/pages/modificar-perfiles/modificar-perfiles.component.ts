import { Component, Inject } from '@angular/core';
import { MantenimientoPerfilesService } from '../../services/mantenimiento-perfiles.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PerfilesInterfaces } from '../../interfaces/perfiles.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { ResponsePerfiles } from '../../interfaces/ResponsePerfiles.interfaces';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';

@Component({
  selector: 'app-modificar-perfiles',
  templateUrl: './modificar-perfiles.component.html',
  styleUrls: ['./modificar-perfiles.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class ModificarPerfilesComponent {
  constructor(private service:MantenimientoPerfilesService ,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService, 
              private dialogRef: MatDialogRef<ModificarPerfilesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PerfilesInterfaces ){}
  perfil: PerfilesInterfaces = this.data;

  perfilUp = new FormGroup({
    descripcion: new FormControl(this.perfil.descripcion,Validators.required),
  });

  verificar() {
    if (this.perfilUp.valid) {
      this.confirmationService.confirm({
        message: '¿Desea modificar los datos del perfil "'+this.perfil.descripcion+'"? ',
        header: 'Advertencia',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modificar();
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Precaución', detail: 'Verifique antes de modificar.'});
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
        id: this.perfil.id,
        descripcion: this.perfilUp.value.descripcion,
      },
      skipLocationChange: false,
      fragment: 'top'
    };
    this.service.updData(objToSend.queryParams as PerfilesInterfaces).subscribe((data:ResponsePerfiles) =>{
      this.messageService.add({severity: 'info', summary: 'Codigo: '+data.status, detail: 'Estado: '+data.message });
    }),(error: BackErrorResponse) => {
      console.error('Error:', error);
      this.messageService.add({ severity: 'error', summary: error.error.code , detail: error.error.code });
      
    };
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }

  limpiar(){
    this.perfilUp.reset();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
