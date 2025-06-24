import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../shared/interfaces';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, OrganizationsService } from '../../../../shared';
import { OrganizationEnums } from '../../../../core/enums/organization-enums';

@Component({
    selector: 'app-org-owner-companies',
    imports: [RouterModule, FormsModule, ReactiveFormsModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './org-owner-companies.component.html',
    styleUrl: './org-owner-companies.component.scss'
})
export class OrgOwnerCompaniesComponent extends BaseListComponent {
    tableOptions!: TableOptions;
    service = inject(OrganizationsService);
    formBuilder: FormBuilder = inject(FormBuilder);
    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.initializeTableOptions();
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: 'organizations/getPaged',
                getAllMethod: 'POST',
                delete: 'organizations/delete'
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'SONO-TRACKER-ORGANIZATION-OWNER-COMPANIES',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {
                    organizationTypeId: this.organizationEnum.OwnerCompany
                }
            },
            responsiveDisplayedProperties: ['code', 'licenseNumber', 'nameAr', 'nameEn']
        };
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'code',
                header: 'الكود',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'licenseNumber',
                header: 'رقم الترخيص',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'nameAr',
                header: 'الاسم بالعربية',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'nameEn',
                header: 'الاسم بالانجليزية',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'address',
                header: 'العنوان',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'mobile',
                header: 'رقم المحمول',
                filter: true,
                filterMode: 'text'
            }
        ];
    }

    initializeTableActions(): TableOptions['inputActions'] {
        return [
            {
                name: 'EDIT',
                icon: 'pi pi-file-edit',
                color: 'text-middle',
                isEdit: true,
                route: '/pages/org-owner-companies/edit/',
                allowAll: true
            },
            {
                name: 'DELETE',
                icon: 'pi pi-trash',
                color: 'text-error',
                allowAll: true,
                isDelete: true
            }
        ];
    }

    get organizationEnum() {
        return OrganizationEnums;
    }
    /* when leaving the component */
    override ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
