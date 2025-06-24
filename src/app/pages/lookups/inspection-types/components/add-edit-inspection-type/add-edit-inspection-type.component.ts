import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, InspectionTypesService } from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-edit-inspection-type',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-inspection-type.component.html',
    styleUrl: './add-edit-inspection-type.component.scss'
})
export class AddEditInspectiontypeComponent extends BaseEditComponent implements OnInit {
    service: InspectionTypesService = inject(InspectionTypesService);
    dialogService: DialogService = inject(DialogService);
    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }
    result: any;
    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditInspectionType();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            code: ['', Validators.required],
            nameEn: ['', Validators.required],
            nameAr: ['', Validators.required]
        });
    }

    getEditInspectionType = () => {
        this.service.getEditInspectionType(this.id).subscribe((element: any) => {
            this.initFormGroup();
            this.form.patchValue(element);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.service.add(this.form.value).subscribe({next: (res) => {
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
            this.service.update({ id: this.id, ...this.form.value }).subscribe({next: (res) => {
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
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
