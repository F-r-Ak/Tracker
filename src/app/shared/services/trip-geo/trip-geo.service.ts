import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { UpdateTripGeoDto , GetPagedBody, TripGeoDto, AddTripGeoDto } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripGeoService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/tripgeo/';
  }

  getTripGeo(id: string) {
    return this.get<TripGeoDto>({ apiName: `Get/${id}` });
  }

  getEditTripGeo(id: string) {
    return this.get<TripGeoDto>({ apiName: `getedit/${id}` });
  }

  get TripGeos() {
    return this.get<TripGeoDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: any) {
    return this.post<any, TripGeoDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateTripGeoDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
