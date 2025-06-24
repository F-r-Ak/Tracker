import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../shared/interfaces';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent,TripInformationService } from '../../../../shared';

@Component({
    selector: 'app-trip-information',
    imports: [RouterModule, FormsModule, ReactiveFormsModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './trip-information.component.html',
    styleUrl: './trip-information.component.scss'
})
export class TripInformationComponent extends BaseListComponent {
    tableOptions!: TableOptions;
    service = inject(TripInformationService);
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
                getAll: 'v1/tripinformation/getpaged',
                getAllMethod: 'POST',
                delete: 'v1/tripinformation/deletesoft'
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'SONO-TRACKER-TRIP-INFORMATION',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {}
            },
            responsiveDisplayedProperties: ['code', 'floatingUnitNameAr', 'sartDate', 'endDate','staffNumber','passengerNumber','routeName']
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
                field: 'floatingUnitNameAr',
                header: 'اسم الوحدة ع',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'sartDate',
                header: 'تاريخ البداية',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'endDate',
                header: 'تاريخ النهاية',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'staffNumber',
                header: 'عدد الطاقم',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'passengerNumber',
                header: 'عدد الركاب',
                filter: true,
                filterMode: 'text'
            },
             {
                field: 'routeName',
                header: 'خط السير',
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
                route: '/pages/trip-information/edit/',
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
