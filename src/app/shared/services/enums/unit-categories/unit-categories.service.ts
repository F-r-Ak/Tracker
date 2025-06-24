import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UnitCategoriesService extends HttpService {
  protected get baseUrl(): string {
    return 'unitcategories/';
  }

  get unitCategories() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}
