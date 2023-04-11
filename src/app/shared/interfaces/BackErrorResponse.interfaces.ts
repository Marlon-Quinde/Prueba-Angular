import { HttpErrorResponse } from '@angular/common/http';

export interface BackErrorResponse extends HttpErrorResponse {
  error:{
    code: string;
    message: string;
  }

}
