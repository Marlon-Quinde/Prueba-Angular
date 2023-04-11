import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioInterface } from 'src/app/modules/auth/interfaces/usuario.interface';
import { MantenimientoUsuariosService } from '../../services/mantenimiento-usuarios.service';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';
import { ResponseInterface, Datum } from '../../interfaces/responseUsuario.interfaces';
import { AgregarUsuariosComponent } from '../agregar-usuarios/agregar-usuarios.component';
import { ModificarUsuariosComponent } from '../modificar-usuarios/modificar-usuarios.component';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.css'],
  providers: [ ConfirmationService, MessageService]
})
export class MostrarUsuariosComponent {
  constructor(private service:MantenimientoUsuariosService, 
              private confirmationService:ConfirmationService, 
              private messageService: MessageService, 
              private dialog:MatDialog){}
  usuarios: UsuarioInterface[] = []
  registros = new FormGroup({
    transaccion: new FormControl() 

  })
  
  ngOnInit() {
    this.mostrarTodos();
  };

  mostrarTodos(){
    this.service.getData().subscribe((data:ResponseInterface) =>{
      this.usuarios = data.data;
    });
  };

  eliminar(data: UsuarioInterface) {
    this.confirmationService.confirm({
        message: '¿Esta seguro que desea eliminar el Usuario: '+data.nombre+' '+data.apellido+'?',
        header: 'Advertencia',
        icon: 'pi pi-ban',
        accept: () => {
          this.service.delData(data.id.toString()).subscribe((data: ResponseInterface ) =>{
            this.mostrarTodos()
            this.messageService.add({severity: 'info', summary: 'Codigo: '+data.status, detail: 'Estado: '+data.message });
          })
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity: 'info', summary: 'Notificacion', detail: 'Verifica si es el usuario correcto'});
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Problema', detail: 'No se elimino el usuario' });
                    break;
            }
        }
    });
  }

  modificar(data: UsuarioInterface ){
    this.dialog.open(ModificarUsuariosComponent,{
      width: '70%',
      maxHeight: '80vh',
      data: data
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
  agregar(){
    this.dialog.open(AgregarUsuariosComponent,{
      width: '70%',
      maxHeight: '80vh'
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
}
