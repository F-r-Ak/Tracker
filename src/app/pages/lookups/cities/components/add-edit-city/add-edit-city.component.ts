import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  SubmitButtonsComponent,
  PrimeInputTextComponent,
  PrimeAutoCompleteComponent,
  PrimeDatepickerComponent,
  CitiesService,

} from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-edit-city',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
   PrimeInputTextComponent,
  ],
  templateUrl: './add-edit-city.component.html',
  styleUrl: './add-edit-city.component.scss'
})
export class AddEditCityComponent extends BaseEditComponent implements OnInit {
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
      this.getEditCity();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [],
      code: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
    });
  }


   getEditCity = () => {
    this.citiesService.getEditCity(this.id).subscribe((city: any) => {
      this.initFormGroup();
      this.form.patchValue(city);
    });
  };


  submit() {
    if (this.pageType === 'add')
      this.citiesService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.citiesService.update({ id: this.id, ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
