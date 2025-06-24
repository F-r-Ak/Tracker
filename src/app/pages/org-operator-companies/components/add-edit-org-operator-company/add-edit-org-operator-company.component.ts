import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, OrganizationsService, NationalitiesService, AppliedOnsService, OrganizationStaffComponent } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { OrganizationTabs } from '../../../../core/enums/organization-tabs';
import { OrganizationEnums } from '../../../../core/enums/organization-enums';

@Component({
    selector: 'app-add-edit-org-operator-company',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, TabsModule, OrganizationStaffComponent],
  templateUrl: './add-edit-org-operator-company.component.html',
  styleUrl: './add-edit-org-operator-company.component.scss'
})
export class AddEditOrgOperatorCompanyComponent extends BaseEditComponent implements OnInit {
    selectedNationality: any;
    selectedAppliedOn: any;
    filteredNationalities: any[] = [];
    filteredAppliedOns: any[] = [];
    organizationId: string = '';
    showOrganizationTabs: boolean = false;
    activeTab: OrganizationTabs = OrganizationTabs.Organization;
    service: OrganizationsService = inject(OrganizationsService);
    nationalitiesService: NationalitiesService = inject(NationalitiesService);
    appliedOnsService: AppliedOnsService = inject(AppliedOnsService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditOrganizations();
            this.organizationId = this.activatedRoute.snapshot.paramMap.get('id') as string;
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            code: ['', Validators.required],
            nameAr: ['', Validators.required],
            nameEn: ['', Validators.required],
            address: ['', Validators.required],
            phone: [''],
            fax: [''],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            nationalityId: [null, Validators.required],
            appliedOn: [null, Validators.required],
            organizationTypeId: [this.organizationEnum.OperatingCompany, Validators.required],
            creationDate: ['', Validators.required],
            commercialRegistrationNumber: ['', Validators.required],
            webSiteAddress: [''],
            touristMarinaNumber: [0, Validators.required],
            organizationAttachments: ['']
        });
    }

    getNationalities(event: any) {
        const query = event.query.toLowerCase();
        this.nationalitiesService.nationalities.subscribe({
            next: (res) => {
                this.filteredNationalities = res.filter((element: any) => element.nameAr.toLowerCase().includes(query) || element.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الجنسيات');
            }
        });
    }

    getAppliedOns(event: any) {
        const query = event.query.toLowerCase();
        this.appliedOnsService.appliedOns.subscribe({
            next: (res) => {
                this.filteredAppliedOns = res.filter((element: any) => element.nameAr.toLowerCase().includes(query) || element.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المطبق عليهم');
            }
        });
    }

    onNationalitySelect(event: any) {
        this.selectedNationality = event.value;
        this.form.get('nationalityId')?.setValue(this.selectedNationality?.id);
    }

    onAppliedOnSelect(event: any) {
        this.selectedAppliedOn = event.value;
        this.form.get('appliedOn')?.setValue(this.selectedAppliedOn?.code);
    }

    get organizationTab() {
        return OrganizationTabs;
    }
    get organizationEnum() {
        return OrganizationEnums;
    }

    getEditOrganizations = () => {
        this.service.getEditOrganization(this.id).subscribe((organization: any) => {
            this.initFormGroup();
            this.form.patchValue(organization);
            this.fetchNationalityDetails(organization.nationalityId);
            this.fetchAppliedOnDetails(organization);
        });
    };

    fetchNationalityDetails(nationalityId: any) {
        this.nationalitiesService.getNationality(nationalityId).subscribe((nationalityDetails: any) => {
            this.selectedNationality = nationalityDetails.data;
            this.form.patchValue({
                nationalityId: nationalityDetails.id
            });
        });
    }

    fetchAppliedOnDetails(organization: any) {
        this.appliedOnsService.appliedOns.subscribe((response: any) => {
            this.filteredAppliedOns = Array.isArray(response) ? response : response.data || [];
            this.selectedAppliedOn = this.filteredAppliedOns.find((appliedOn: any) => appliedOn.code === organization.appliedOn);
            this.form.get('appliedOn')?.setValue(this.selectedAppliedOn?.code);
        });
    }

    submit() {
        if (this.pageType === 'add') {
            this.service.add(this.form.value).subscribe((res: any) => {
                this.organizationId = res.id;
                this.showOrganizationTabs = true;
                this.router.navigate(['/pages/org-owner-companies/edit/', res.id]);
            });
        }
        if (this.pageType === 'edit') {
            this.service.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.redirect();
            });
        }
    }

    override redirect = () => {
        super.redirect('/pages/org-owner-companies');
    };
}
