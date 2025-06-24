import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
  SubmitButtonsComponent,
  PrimeInputTextComponent,
  PrimeAutoCompleteComponent,
  PrimeDatepickerComponent,
  AccidentTypesService
} from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-edit-accident-type',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitButtonsComponent,
    PrimeInputTextComponent,
  ],
  templateUrl: './add-edit-accident-type.component.html',
  styleUrl: './add-edit-accident-type.component.scss'
})
export class AddEditAccidentTypeComponent extends BaseEditComponent implements OnInit {
  accidentTypesService: AccidentTypesService = inject(AccidentTypesService);
  dialogService: DialogService = inject(DialogService);
  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
  result: any;
  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach(element => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id = element.instance.ddconfig.data.row.rowData.id;
      }
    });
    if (this.pageType === 'edit') {
      this.getEditAccidentType();
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


  getEditAccidentType = () => {
    this.accidentTypesService.getEditAccidentType(this.id).subscribe((accidentTyp: any) => {
      this.initFormGroup();
      this.form.patchValue(accidentTyp);
    });
  };


  submit() {
    if (this.pageType === 'add')
      this.accidentTypesService.add(this.form.value).subscribe({
        next: (res) => {
          console.log('res', res);
          this.result = res;
          if (this.result === false) {
            alert("هذا الاسم موجود من قبل");
          }
            this.closeDialog();
          
        },
        error: () => {
          alert("Error ")
        }
      });
    if (this.pageType === 'edit')
      this.accidentTypesService.update({ id: this.id, ...this.form.value }).subscribe({next: (res) => {
          console.log('res', res);
          this.result = res;
          if (this.result === false) {
            alert("هذا الاسم موجود من قبل");
          }
            this.closeDialog();
          
        },
        error: () => {
          alert("Error ")
        }
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
