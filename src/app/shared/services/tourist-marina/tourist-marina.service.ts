import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http/http.service';
import { UpdateTouristMarinaDto , GetPagedBody, TouristMarinaDto, AddTouristMarinaDto } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TouristMarinaService extends HttpService {
  protected get baseUrl(): string {
    return 'touristmarina/';
  }

  getTouristMarina(id: string) {
    return this.get<TouristMarinaDto>({ apiName: `Get/${id}` });
  }

  getEditTouristMarina(id: string) {
    return this.get<TouristMarinaDto>({ apiName: `getedit/${id}` });
  }

  get TouristMarinas() {
    return this.get<TouristMarinaDto[]>({ apiName: 'getAll' });
  }

  getDropDown(body: GetPagedBody<any>): Observable<any> {
    return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
  }

  add(body: AddTouristMarinaDto) {
    return this.post<AddTouristMarinaDto, TouristMarinaDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateTouristMarinaDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `delete/`, showAlert: true }, id);
  }
}
