import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}

