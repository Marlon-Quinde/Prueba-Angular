import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.authApiUrl;
  loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient, private router:Router) { }

  login(data: UsuarioInterface): Observable<UsuarioInterface>{
    return this.http.post<UsuarioInterface>(`${this.baseUrl}`, data)
  }

  isLoggedIn(){
    return this.loggedIn.getValue();
  }

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }
  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
