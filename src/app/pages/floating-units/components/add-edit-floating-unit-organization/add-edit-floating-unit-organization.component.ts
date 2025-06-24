import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeAutoCompleteComponent, FloatingUnitOrganizationsService, OrganizationsService } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-edit-floating-unit-organization',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-floating-unit-organization.component.html',
    styleUrl: './add-edit-floating-unit-organization.component.scss'
})
export class AddEditFloatingUnitOrganizationComponent extends BaseEditComponent implements OnInit {
    selectedOrganization: any;
    filteredOrganizations: any[] = [];
    floatingUnitOrganizationsService: FloatingUnitOrganizationsService = inject(FloatingUnitOrganizationsService);
    organizationsService: OrganizationsService = inject(OrganizationsService);

    dialogService: DialogService = inject(DialogService);
    floatingUnitId = '';
    disabledPosition: boolean = true;
    disabledPositionCode: boolean = true;
    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            this.floatingUnitId = element.instance.ddconfig.data.row.floatingUnitId;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditFloatingUnitOrganization();
            this.disabledPosition = false;
            this.disabledPositionCode = false;
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            floatingUnitId: [this.floatingUnitId, Validators.required],
            organizationId: [null, Validators.required]
        });
    }

    getOrganizations(body: any) {
        return this.organizationsService.getDropDown(body);
    }

    onOrganizationSelect(event: any) {
        this.selectedOrganization = event.value;
        this.form.get('organizationId')?.setValue(this.selectedOrganization?.id);
    }

    getEditFloatingUnitOrganization = () => {
        this.floatingUnitOrganizationsService.getEditFloatingUnitOrganization(this.id).subscribe((floatingUnitStaff: any) => {
            this.initFormGroup();
            this.form.patchValue(floatingUnitStaff);
            this.fetchOrganizationDetails(floatingUnitStaff.organizationId);
        });
    };

    fetchOrganizationDetails(organizationId: any) {
        this.organizationsService.getOrganization(organizationId).subscribe((organizationDetails: any) => {
            this.selectedOrganization = organizationDetails?.data || organizationDetails;
            this.form.patchValue({
                organizationId: organizationDetails?.data?.id || organizationDetails?.id
            });
        });
    }

    submit() {
        if (this.pageType === 'add')
            this.floatingUnitOrganizationsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.floatingUnitOrganizationsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
