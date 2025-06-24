import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IdTypesService extends HttpService {
  protected get baseUrl(): string {
    return 'idtypes/';
  }

  get idTypes() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}
