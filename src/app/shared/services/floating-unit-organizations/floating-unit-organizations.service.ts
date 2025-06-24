import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { AddFloatingUnitOrganizationDto, FloatingUnitOrganizationDto, UpdateFloatingUnitOrganizationDto , GetPagedBody } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloatingUnitOrganizationsService extends HttpService {
  protected get baseUrl(): string {
    return 'floatingunitorganizations/';
  }

  getFloatingUnitOrganization(id: string) {
    return this.get<FloatingUnitOrganizationDto>({ apiName: `Get/${id}` });
  }

  getEditFloatingUnitOrganization(id: string) {
    return this.get<FloatingUnitOrganizationDto>({ apiName: `getEdit/${id}` });
  }

  get floatingUnitOrganizations() {
    return this.get<FloatingUnitOrganizationDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddFloatingUnitOrganizationDto) {
    return this.post<AddFloatingUnitOrganizationDto, FloatingUnitOrganizationDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateFloatingUnitOrganizationDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
