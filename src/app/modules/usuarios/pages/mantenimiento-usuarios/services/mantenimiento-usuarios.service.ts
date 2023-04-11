import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInterface } from 'src/app/modules/auth/interfaces/usuario.interface';
import { environment } from 'src/environments/environments';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';
import { ResponseInterface } from '../interfaces/responseUsuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoUsuariosService {

  apiUrl:string = environment.usuariosApiUrl;
  constructor(private http: HttpClient) { }

  getData():Observable<ResponseInterface>{
    const url = `${this.apiUrl}`;
    return this.http.get<ResponseInterface>(url)
  }
  delData(id: string): Observable<ResponseInterface> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ResponseInterface>(url);
  }

  setData(dataInterface: UsuarioInterface): Observable<ResponseInterface> {
    const url = `${this.apiUrl}`;
    return this.http.post<ResponseInterface>(url, dataInterface);
  }

  updData(dataInterface: UsuarioInterface): Observable<ResponseInterface> {
    const url = `${this.apiUrl}/${dataInterface.id}`;
    return this.http.put<ResponseInterface>(url,dataInterface);
  }
}
