import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { GetPagedBody, MarinaOrganizationDto, AddMarinaOrganizationDto, UpdateMarinaOrganizationDto } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarinaOrganizationService extends HttpService {
  protected get baseUrl(): string {
    return 'marinaorganization/';
  }

  getMarinaOrganization(id: string) {
    return this.get<MarinaOrganizationDto>({ apiName: `Get/${id}` });
  }

  getEditMarinaOrganization(id: string) {
    return this.get<MarinaOrganizationDto>({ apiName: `getEdit/${id}` });
  }

  get marinaOrganization() {
    return this.get<MarinaOrganizationDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddMarinaOrganizationDto) {
    return this.post<AddMarinaOrganizationDto, MarinaOrganizationDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateMarinaOrganizationDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
