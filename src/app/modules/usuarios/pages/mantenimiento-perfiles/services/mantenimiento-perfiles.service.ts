import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ResponsePerfiles } from '../interfaces/ResponsePerfiles.interfaces';
import { PerfilesInterfaces } from '../interfaces/perfiles.interfaces';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoPerfilesService {

  constructor(private http:HttpClient) { }

  apiUrl:string = environment.perfilesApiUrl;

  getData():Observable<ResponsePerfiles>{
    const url = `${this.apiUrl}`;
    return this.http.get<ResponsePerfiles>(url)
  }
  delData(id: string): Observable<ResponsePerfiles> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ResponsePerfiles>(url);
  }

  setData(dataInterface: PerfilesInterfaces): Observable<ResponsePerfiles> {
    const url = `${this.apiUrl}`;
    return this.http.post<ResponsePerfiles>(url, dataInterface);
  }

  updData(dataInterface: PerfilesInterfaces): Observable<ResponsePerfiles> {
    const url = `${this.apiUrl}/${dataInterface.id}`;
    return this.http.put<ResponsePerfiles>(url,dataInterface);
  }
}
