import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
    FloatingUnitStaffService,
    NationalitiesService,
    GendersService,
    IdTypesService,
    PrimeCheckBoxComponent,
    PrimeDatepickerComponent,
    OrganizationsService,
    MarinaOrganizationService
} from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-edit-marina-organization',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeCheckBoxComponent, PrimeDatepickerComponent],
    templateUrl: './add-edit-marina-organization.component.html',
    styleUrl: './add-edit-marina-organization.component.scss'
})
export class AddEditMarinaMrganizationComponent extends BaseEditComponent implements OnInit {
    touristMarinaId = '';
    selectedOrganization: any;
    filteredOrganizations: any[] = [];
    organizationsService: OrganizationsService = inject(OrganizationsService);
    marinaOrganizationService: MarinaOrganizationService = inject(MarinaOrganizationService);
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            this.touristMarinaId = element.instance.ddconfig.data.row.touristMarinaId;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditMarinaOrganization();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            organizationId: ['', Validators.required],
            touristMarinaId: [this.touristMarinaId, Validators.required],
            licenseNumber: ['', Validators.required],
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            isActive: [false]
        });
    }

    getOrganizations(body: any) {
        return this.organizationsService.getDropDown(body);
    }

    onOrganizationSelect(event: any) {
        this.selectedOrganization = event.value;
        this.form.get('organizationId')?.setValue(this.selectedOrganization?.id);
    }

    getEditMarinaOrganization = () => {
        this.marinaOrganizationService.getEditMarinaOrganization(this.id).subscribe((MarinaOrganization: any) => {
            this.initFormGroup();
            this.form.patchValue(MarinaOrganization);
            // this.fetchOrganizationDetails(MarinaOrganization.organizationId);
        });
    };

    fetchOrganizationDetails(organizationId: any) {
        this.organizationsService.getOrganization(organizationId).subscribe((organizationDetails: any) => {
            this.selectedOrganization = organizationDetails.data;
            this.form.patchValue({
                organizationId: organizationDetails.id
            });
        });
    }

    submit() {
        if (this.pageType === 'add')
            this.marinaOrganizationService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.marinaOrganizationService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
