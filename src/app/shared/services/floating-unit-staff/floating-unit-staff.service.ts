import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { AddFloatingUnitStaffDto, FloatingUnitStaffDto, UpdateFloatingUnitStaffDto , GetPagedBody } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloatingUnitStaffService extends HttpService {
  protected get baseUrl(): string {
    return 'floatingunitstaffs/';
  }

  getFloatingUnitStaff(id: string) {
    return this.get<FloatingUnitStaffDto>({ apiName: `Get/${id}` });
  }

  getEditFloatingUnitStaff(id: string) {
    return this.get<FloatingUnitStaffDto>({ apiName: `getEdit/${id}` });
  }

  get floatingUnitStaff() {
    return this.get<FloatingUnitStaffDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddFloatingUnitStaffDto) {
    return this.post<AddFloatingUnitStaffDto, FloatingUnitStaffDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateFloatingUnitStaffDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
