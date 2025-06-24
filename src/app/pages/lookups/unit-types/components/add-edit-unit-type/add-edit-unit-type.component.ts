import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';
import { UnitTypesService } from '../../../../../shared/services/lookups/unit-types/unit-types.service';

@Component({
    selector: 'app-add-edit-unit-type',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-unit-type.component.html',
    styleUrl: './add-edit-unit-type.component.scss'
})
export class AddEditUnitTypeComponent extends BaseEditComponent implements OnInit {
    service: UnitTypesService = inject(UnitTypesService);
    dialogService: DialogService = inject(DialogService);
    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditUnitType();
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

    getEditUnitType = () => {
        this.service.getEditUnitType(this.id).subscribe((element: any) => {
            this.initFormGroup();
            this.form.patchValue(element);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.service.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.service.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
