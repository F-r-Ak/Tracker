import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http/http.service';
import { AccountDto,LoginDto, RefreshTokenDto, RegisterDto } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends HttpService {
  protected get baseUrl(): string {
    return 'account/';
  }

  
  register(body: RegisterDto) {
    return this.post<RegisterDto, AccountDto>({ apiName: 'register', showAlert: true }, body);
  }

  login(body: LoginDto) {
    return this.post<LoginDto, any>({ apiName: 'login', showAlert: true }, body);
  }

  refreshToken(body: RefreshTokenDto): Observable<any> {
    return this.post<RefreshTokenDto,any>({ apiName: 'refreshtoken', showAlert: true },body);
  } 
 
}
