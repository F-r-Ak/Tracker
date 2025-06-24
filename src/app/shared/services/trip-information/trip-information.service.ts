import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { UpdateFloatingUnitDto , GetPagedBody, TripInformationDto, AddTripInformationDto } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripInformationService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/tripinformation/';
  }

  getFloatingUnit(id: string) {
    return this.get<TripInformationDto>({ apiName: `Get/${id}` });
  }

  getEditTripInformation(id: string) {
    return this.get<TripInformationDto>({ apiName: `getedit/${id}` });
  }

  get TripInformations() {
    return this.get<TripInformationDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddTripInformationDto) {
    return this.post<AddTripInformationDto, TripInformationDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateFloatingUnitDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
