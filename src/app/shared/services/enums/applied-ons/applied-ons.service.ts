import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppliedOnsService extends HttpService {
  protected get baseUrl(): string {
    return 'appliedons/';
  }

  get appliedOns() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}
