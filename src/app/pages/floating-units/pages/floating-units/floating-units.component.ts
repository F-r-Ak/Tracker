import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../shared/interfaces';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, FloatingUnitsService } from '../../../../shared';

@Component({
    selector: 'app-floating-units',
    imports: [RouterModule, FormsModule, ReactiveFormsModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './floating-units.component.html',
    styleUrl: './floating-units.component.scss'
})
export class FloatingUnitsComponent extends BaseListComponent {
    tableOptions!: TableOptions;
    service = inject(FloatingUnitsService);
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
                getAll: 'floatingunits/getPaged',
                getAllMethod: 'POST',
                delete: 'floatingunits/deletesoft'
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'SONO-TRACKER-FLOATING-UNITS',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {}
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
                field: 'unitCategoryName.nameAr',
                header: 'فئة الوحدة ',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'unitTypeName',
                header: 'النوع',
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
                route: '/pages/floating-units/edit/',
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
    /* when leaving the component */
    override ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
