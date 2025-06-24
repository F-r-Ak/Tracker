import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, NationalitiesService, GendersService, IdTypesService, OrganizationStaffService } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-edit-organization-staff',
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-organization-staff.component.html',
    styleUrl: './add-edit-organization-staff.component.scss'
})
export class AddEditOrganizationStaffComponent extends BaseEditComponent implements OnInit {
    selectedNationality: any;
    selectedGender: any;
    selectedIdType: any;
    filteredGenders: any[] = [];
    filteredNationalities: any[] = [];
    filteredIdTypes: any[] = [];
    service: OrganizationStaffService = inject(OrganizationStaffService);

    gendersService: GendersService = inject(GendersService);
    nationalitiesService: NationalitiesService = inject(NationalitiesService);
    idTypesService: IdTypesService = inject(IdTypesService);

    dialogService: DialogService = inject(DialogService);
    organizationId = '';
    disabledPosition: boolean = true;
    disabledPositionCode: boolean = true;
    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            this.organizationId = element.instance.ddconfig.data.row.organizationId;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditOrganizationStaff();
            this.disabledPosition = false;
            this.disabledPositionCode = false;
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            organizationId: [this.organizationId, Validators.required],
            name: ['', Validators.required],
            job: ['', Validators.required],
            phone: ['', Validators.required],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            gender: ['', Validators.required],
            idType: ['', Validators.required],
            identity: ['', Validators.required],
            nationalityId: ['', Validators.required]
        });
    }

    getNationalities(body: any) {
        return this.nationalitiesService.getDropDown(body);
    }

    getGenders(event: any) {
        const query = event.query.toLowerCase();
        this.gendersService.genders.subscribe({
            next: (res) => {
                this.filteredGenders = res.filter((gender: any) => gender.nameAr.toLowerCase().includes(query) || gender.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات النوع');
            }
        });
    }

    getIdTypes(event: any) {
        const query = event.query.toLowerCase();
        this.idTypesService.idTypes.subscribe({
            next: (res) => {
                this.filteredIdTypes = res.filter((idType: any) => idType.nameAr.toLowerCase().includes(query) || idType.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات نوع الهوية');
            }
        });
    }

    onNationalitySelect(event: any) {
        this.selectedNationality = event.value;
        this.form.get('nationalityId')?.setValue(this.selectedNationality?.id);
    }

    onGenderSelect(event: any) {
        this.selectedGender = event.value;
        this.form.get('gender')?.setValue(this.selectedGender?.code);
    }

    onIdTypeSelect(event: any) {
        this.selectedIdType = event.value;
        this.form.get('idType')?.setValue(this.selectedIdType?.code);
    }

    getEditOrganizationStaff = () => {
        this.service.getEditOrganizationStaff(this.id).subscribe((floatingUnitStaff: any) => {
            this.initFormGroup();
            this.form.patchValue(floatingUnitStaff);
            this.fetchGenderDetails(floatingUnitStaff);
            this.fetchIdTypeDetails(floatingUnitStaff);
            this.fetchNationalityDetails(floatingUnitStaff.nationalityId);
        });
    };

    fetchNationalityDetails(nationalityId: any) {
        this.nationalitiesService.getNationality(nationalityId).subscribe((nationalityDetails: any) => {
            this.selectedNationality = nationalityDetails?.data || nationalityDetails;
            this.form.patchValue({
                nationalityId: nationalityDetails?.data?.id || nationalityDetails?.id
            });
        });
    }

    fetchGenderDetails(floatingUnitStaff: any) {
        this.gendersService.genders.subscribe((response: any) => {
            this.filteredGenders = Array.isArray(response) ? response : response.data || [];
            this.selectedGender = this.filteredGenders.find((type: any) => type.code === floatingUnitStaff.gender);
            this.form.get('gender')?.setValue(this.selectedGender?.code);
        });
    }

    fetchIdTypeDetails(floatingUnitStaff: any) {
        this.idTypesService.idTypes.subscribe((response: any) => {
            this.filteredIdTypes = Array.isArray(response) ? response : response.data || [];
            this.selectedIdType = this.filteredIdTypes.find((type: any) => type.code === floatingUnitStaff.idType);
            this.form.get('idType')?.setValue(this.selectedIdType?.code);
        });
    }

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
