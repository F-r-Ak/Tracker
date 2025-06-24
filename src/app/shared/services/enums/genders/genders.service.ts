import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GendersService extends HttpService {
  protected get baseUrl(): string {
    return 'genders/';
  }

  get genders() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}
