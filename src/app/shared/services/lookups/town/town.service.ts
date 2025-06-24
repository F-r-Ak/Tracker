import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { AddTestDto, TestDto, UpdateTestDto , GetPagedBody } from '../../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TownService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/town/';
  }

  getTown(id: string) {
    return this.get<TestDto>({ apiName: `Get/${id}` });
  }

  getEditTown(id: string) {
    return this.get<TestDto>({ apiName: `getEdit/${id}` });
  }

  get town() {
    return this.get<TestDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddTestDto) {
    return this.post<AddTestDto, TestDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateTestDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
