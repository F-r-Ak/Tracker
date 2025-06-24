import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { AddOrganizationDto, OrganizationDto, UpdateOrganizationDto , GetPagedBody } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends HttpService {
  protected get baseUrl(): string {
    return 'organizations/';
  }

  getOrganization(id: string) {
    return this.get<OrganizationDto>({ apiName: `Get/${id}` });
  }

  getEditOrganization(id: string) {
    return this.get<OrganizationDto>({ apiName: `getEdit/${id}` });
  }

  get organizations() {
    return this.get<OrganizationDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddOrganizationDto) {
    return this.post<AddOrganizationDto, OrganizationDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateOrganizationDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
