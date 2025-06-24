import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, RoutesService } from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-edit-route',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-route.component.html',
    styleUrl: './add-edit-route.component.scss'
})
export class AddEditRouteComponent extends BaseEditComponent implements OnInit {
    service: RoutesService = inject(RoutesService);
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
            this.getEditRoute();
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

    getEditRoute = () => {
        this.service.getEditRoute(this.id).subscribe((element: any) => {
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
