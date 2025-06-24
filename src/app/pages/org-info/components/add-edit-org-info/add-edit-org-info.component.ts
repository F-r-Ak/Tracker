import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, OrganizationsService, PrimeCheckBoxComponent, PrimeAutoCompleteComponent, InspectionTypesService, OrganizationStaffComponent } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { OrganizationTabs } from '../../../../core/enums/organization-tabs';
import { OrganizationEnums } from '../../../../core/enums/organization-enums';
@Component({
    selector: 'app-add-edit-org-info',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, TabsModule, PrimeCheckBoxComponent, PrimeAutoCompleteComponent, OrganizationStaffComponent],
    templateUrl: './add-edit-org-info.component.html',
    styleUrl: './add-edit-org-info.component.scss'
})
export class AddEditOrgInfoComponent extends BaseEditComponent implements OnInit {
    selectedInspectionType: any;
    filteredInspectionTypes: any[] = [];
    organizationId: string = '';
    showOrganizationTabs: boolean = false;
    activeTab: OrganizationTabs = OrganizationTabs.Organization;
    organizationsService: OrganizationsService = inject(OrganizationsService);
    inspectionTypesService: InspectionTypesService = inject(InspectionTypesService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditOrganization();
            this.organizationId = this.activatedRoute.snapshot.paramMap.get('id') as string;
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
            address: ['', Validators.required],
            organizationTypeId: [this.organizationEnum.GovernmentCompany, Validators.required],
            inspectionTypeId: [null, Validators.required],
            phone: [''],
            fax: [''],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            isAccepted: [false]
        });
    }

    getInspectionTypes(event: any) {
        const query = event.query.toLowerCase();
        this.inspectionTypesService.inspectionTypes.subscribe({
            next: (res) => {
                this.filteredInspectionTypes = res.filter((inspectionType: any) => inspectionType.nameAr.toLowerCase().includes(query) || inspectionType.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات أنواع التفتيش');
            }
        });
    }

    onInspectionTypeSelect(event: any) {
        this.selectedInspectionType = event.value;
        this.form.get('inspectionTypeId')?.setValue(this.selectedInspectionType.id);
    }

    get organizationTab() {
        return OrganizationTabs;
    }
    get organizationEnum() {
        return OrganizationEnums;
    }

    getEditOrganization = () => {
        this.organizationsService.getEditOrganization(this.id).subscribe((organization: any) => {
            this.initFormGroup();
            this.form.patchValue(organization);
            this.fetchInspectionTypeDetails(organization);
        });
    };

    fetchInspectionTypeDetails(organization: any) {
        this.inspectionTypesService.inspectionTypes.subscribe((response: any) => {
            this.filteredInspectionTypes = Array.isArray(response) ? response : response.data || [];
            this.selectedInspectionType = this.filteredInspectionTypes.find((inspectionType: any) => inspectionType.id === organization.inspectionTypeId);
            this.form.get('inspectionTypeId')?.setValue(this.selectedInspectionType.id);
        });
    }

    submit() {
        if (this.pageType === 'add') {
            this.organizationsService.add(this.form.value).subscribe((res: any) => {
                this.organizationId = res.id;
                this.showOrganizationTabs = true;
                this.router.navigate(['/pages/org-info/edit/', res.id]);
            });
        }
        if (this.pageType === 'edit') {
            this.organizationsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.redirect();
            });
        }
    }

    override redirect = () => {
        super.redirect('/pages/org-info');
    };
}
