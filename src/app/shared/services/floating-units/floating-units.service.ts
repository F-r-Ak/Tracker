import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { AddFloatingUnitDto, FloatingUnitDto, UpdateFloatingUnitDto , GetPagedBody } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloatingUnitsService extends HttpService {
  protected get baseUrl(): string {
    return 'floatingunits/';
  }

  getFloatingUnit(id: string) {
    return this.get<FloatingUnitDto>({ apiName: `Get/${id}` });
  }

  getEditFloatingUnit(id: string) {
    return this.get<FloatingUnitDto>({ apiName: `getEdit/${id}` });
  }

  get floatingUnits() {
    return this.get<FloatingUnitDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddFloatingUnitDto) {
    return this.post<AddFloatingUnitDto, FloatingUnitDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateFloatingUnitDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}