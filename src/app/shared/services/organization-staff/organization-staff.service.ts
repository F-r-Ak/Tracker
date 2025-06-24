import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { GetPagedBody } from '../../interfaces';
import { Observable } from 'rxjs';
import { AddOrganizationStaffDto, UpdateOrganizationStaffDto, OrganizationStaffDto } from '../../interfaces/organization-staff/organization-staff';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStaffService extends HttpService {
  protected get baseUrl(): string {
    return 'organizationstaffs/';
  }

  getOrganizationStaff(id: string) {
    return this.get<OrganizationStaffDto>({ apiName: `Get/${id}` });
  }

  getEditOrganizationStaff(id: string) {
    return this.get<OrganizationStaffDto>({ apiName: `getEdit/${id}` });
  }

  get organizationStaff() {
    return this.get<OrganizationStaffDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddOrganizationStaffDto) {
    return this.post<AddOrganizationStaffDto, OrganizationStaffDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateOrganizationStaffDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
