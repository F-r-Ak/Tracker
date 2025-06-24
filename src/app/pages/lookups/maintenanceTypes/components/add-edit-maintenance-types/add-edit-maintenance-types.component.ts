import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  SubmitButtonsComponent,
  PrimeInputTextComponent,
  PrimeAutoCompleteComponent,
  PrimeDatepickerComponent,
  MaintenanceTypesService
} from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-edit-maintenance-types',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
  ],
  templateUrl: './add-edit-maintenance-types.component.html',
  styleUrl: './add-edit-maintenance-types.component.scss'
})
export class AddEditMaintenanceTypesComponent extends BaseEditComponent implements OnInit {
  maintenanceTypesService: MaintenanceTypesService = inject(MaintenanceTypesService);
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
      this.getEditMaintenanceTypes();
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


   getEditMaintenanceTypes = () => {
    this.maintenanceTypesService.getEditMaintenanceTypes(this.id).subscribe((accidentTyp: any) => {
      this.initFormGroup();
      this.form.patchValue(accidentTyp);
    });
  };


  submit() {
    if (this.pageType === 'add')
      this.maintenanceTypesService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.maintenanceTypesService.update({ id: this.id, ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
