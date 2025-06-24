import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrganizationTypesService extends HttpService {
  protected get baseUrl(): string {
    return 'organizationtypes/';
  }

  get organizationTypes() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}
