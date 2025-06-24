import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  SubmitButtonsComponent,
  PrimeInputTextComponent,
  PrimeAutoCompleteComponent,
  PrimeDatepickerComponent,
  AccidentTypesService,
  TownService,
  CitiesService
} from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';
import { Lookup } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-add-edit-accident-type',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent
  ],
  templateUrl: './add-edit-town.component.html',
  styleUrl: './add-edit-town.component.scss'
})
export class AddEditTownComponent extends BaseEditComponent implements OnInit {
   selectedCity: any;
  filteredCities: Lookup[] = [];
  townService: TownService = inject(TownService);
  citiesService: CitiesService = inject(CitiesService);
  dialogService: DialogService = inject(DialogService);
  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach(element => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditTown();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [],
      cityId: [null],
      governorateId: ["71aa71c3-8494-43ba-81de-08ddae2d182d", Validators.required],
      code: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
    });
  }


   getEditTown = () => {
    this.townService.getEditTown(this.id).subscribe((town: any) => {
      this.initFormGroup();
      this.form.patchValue(town);
      this.fetchCityDetails(town.cityId);
    });
  };


  getCities(body: any) {
    return this.citiesService.getDropDown(body);
  }

  onCitySelect(event: any) {
    this.selectedCity = event.value;
    this.form.get('cityId')?.setValue(this.selectedCity.id);
  }

  fetchCityDetails(cityId: any) {
        this.citiesService.getCity(cityId).subscribe((cityDetails: any) => {
            this.selectedCity = cityDetails?.data || cityDetails;
            this.form.patchValue({
                cityId: cityDetails?.data?.id || cityDetails?.id
            });
        });
    }

  submit() {
    if (this.pageType === 'add')
      this.townService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.townService.update({ id: this.id, ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
