import { Component } from '@angular/core';
import { MantenimientoPerfilesService } from '../../services/mantenimiento-perfiles.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { PerfilesInterfaces } from '../../interfaces/perfiles.interfaces';
import { FormGroup } from '@angular/forms';
import { ResponsePerfiles } from '../../interfaces/ResponsePerfiles.interfaces';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';
import { AgregarPerfilesComponent } from '../agregar-perfiles/agregar-perfiles.component';
import { ModificarPerfilesComponent } from '../modificar-perfiles/modificar-perfiles.component';

@Component({
  selector: 'app-mostrar-perfiles',
  templateUrl: './mostrar-perfiles.component.html',
  styleUrls: ['./mostrar-perfiles.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class MostrarPerfilesComponent {
constructor(private service:MantenimientoPerfilesService, 
    private confirmationService:ConfirmationService, 
    private messageService: MessageService, 
    private dialog:MatDialog){}
    perfiles: PerfilesInterfaces[] = []
    registros = new FormGroup({
})

  ngOnInit() {
    this.mostrarTodos();
  };

  mostrarTodos(){
      this.service.getData().subscribe((data:ResponsePerfiles) =>{
      this.perfiles = data.data;
    });
  };

  eliminar(data: PerfilesInterfaces) {
    this.confirmationService.confirm({
    message: '¿Esta seguro que desea eliminar el perfil: '+data.descripcion+'?',
    header: 'Advertencia',
    icon: 'pi pi-ban',
    accept: () => {
    this.service.delData(data.id.toString()).subscribe((data:ResponsePerfiles) =>{
      this.mostrarTodos()
      this.messageService.add({severity: 'info', summary: 'Codigo: '+data.status, detail: 'Estado: '+data.message });
    })
  },
  reject: (type:any) => {
    switch (type) {
        case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'info', summary: 'Notificacion', detail: 'Verifica si desea borrar el perfil'});
            break;
        case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'error', summary: 'Problema', detail: 'No se elimino el perfil' });
            break;
    }
  }
  });
  }

  modificar(data: PerfilesInterfaces ){
    this.dialog.open(ModificarPerfilesComponent,{
      width: '70%',
      maxHeight: '80vh',
      data: data
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
  agregar(){
    this.dialog.open(AgregarPerfilesComponent,{
      width: '70%',
      maxHeight: '80vh'
    }).afterClosed().subscribe(() =>{
      this.mostrarTodos();
    })
  }
}
