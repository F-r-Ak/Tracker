import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { UpdateMarinaTripDto , GetPagedBody, MarinaTripDto, AddMarinaTripDto } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarinaTripsService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/marinatrips/';
  }

  getMarinaTrip(id: string) {
    return this.get<MarinaTripDto>({ apiName: `Get/${id}` });
  }

  getEditMarinaTrip(id: string) {
    return this.get<MarinaTripDto>({ apiName: `getedit/${id}` });
  }

  get MarinaTrips() {
    return this.get<MarinaTripDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddMarinaTripDto) {
    return this.post<AddMarinaTripDto, MarinaTripDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateMarinaTripDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
