import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, GovernatesService } from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-edit-governate',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-governate.component.html',
    styleUrl: './add-edit-governate.component.scss'
})
export class AddEditGovernate extends BaseEditComponent implements OnInit {
    service: GovernatesService = inject(GovernatesService);
    dialogService: DialogService = inject(DialogService);

    googleMap: Boolean = false;
    center: google.maps.LatLngLiteral = { lat: 24.086053859367915, lng: 32.907119283966175 };
    // zoom: number = 8;
    zoom = 12;
    markers = [
        { lat: 24.086053859367915, lng: 32.907119283966175 },
        { lat: 24.1042282507531, lng: 32.901104905159485 }
    ];

    options: google.maps.MapOptions = {}; // Add this line to define the options property
    formData: any;

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            console.log('dialog data googleMap: ', element.instance.ddconfig.data.googleMap);
            this.googleMap = element.instance.ddconfig.data.googleMap;

            this.pageType = element.instance.ddconfig.data.pageType;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditGovernate();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            code: ['', Validators.required],
            name: ['', Validators.required],
            address: [''],
            url: [''],
            imageUrl: ['']
        });
    }

    getEditGovernate = () => {
        this.service.getEditGovernate(this.id).subscribe((element: any) => {
            this.initFormGroup();
            this.form.patchValue(element);
        });
    };

    submit() {
        this.formData = new FormData();
        this.formData.append('Code', this.form.value.code);
        this.formData.append('Name', this.form.value.name);
        this.formData.append('Address', this.form.value.address);
        this.formData.append('Url', this.form.value.url);
        this.formData.append('ImageUrl', this.form.value.imageUrl);
        
        if (this.pageType === 'add')
            this.service.add(this.formData).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.service.update({ id: this.id, ...this.formData }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
