import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../../shared/interfaces';
import { GovernatesService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { AddEditGovernate } from '../../components/add-edit-governate/add-edit-governate.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GovernateGeoPoint } from "../../../governate-geo-points/pages/governate-geo-points/governate-geo-points.component"; // Import Google Maps module if needed

@Component({
    selector: 'app-governates',
    imports: [RouterModule, GoogleMapsModule, FormsModule, ReactiveFormsModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, GovernateGeoPoint],

    templateUrl: './governates.component.html',
    styleUrl: './governates.component.scss'
})
export class Governate extends BaseListComponent {
    tableOptions!: TableOptions;
    sideTableOptions!: TableOptions;
    service = inject(GovernatesService);
    formBuilder: FormBuilder = inject(FormBuilder);

    googleMap: Boolean = false;
    center: google.maps.LatLngLiteral = { lat: 24.086053859367915, lng: 32.907119283966175 };
    zoom = 12;
    markers = [
        { lat: 24.086053859367915, lng: 32.907119283966175 },
        { lat: 24.1042282507531, lng: 32.901104905159485 }
    ];

    options = {
        strokeColor: '#b51512', // Red line
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#b51512', // Optional: fill color
        fillOpacity: 0.35
    }; // Add this line to define the options property

    constructor(activatedRoute: ActivatedRoute, googleText: GoogleMapsModule) {
        console.log('Google Maps Module: ', googleText);

        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.initializeTableOptions();
        this.initializeSideTableOptions();

        this.googleMap = true;
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: 'v1/governorates/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/governorates/deletesoft'
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'SYSTEM-MANAGEMENT-SMART-TESTS',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {}
            },
            responsiveDisplayedProperties: ['code', 'name', 'email']
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
                field: 'name',
                header: 'المحافظة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'email',
                header: 'الموقع الالكترونى',
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
                isCallBack: true,
                call: (row) => {
                    this.openEdit(row);
                },
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

    openAdd() {
        this.openDialog(AddEditGovernate, 'اضافة بيانات المحافظة', {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditGovernate, 'تعديل بيانات المحافظة', {
            pageType: 'edit',
            row: { rowData },
            googleMap: true
        });
    }

    initializeSideTableOptions() {
        this.sideTableOptions = {
            inputUrl: {
                getAll: 'v1/governorategeopoints/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/governorategeopoints/deletesoft'
            },
            inputCols: this.initializeSideTableColumns(),
            inputActions: this.initializeSideTableActions(),
            permissions: {
                componentName: 'SYSTEM-MANAGEMENT-SMART-TESTS',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {}
            },
            responsiveDisplayedProperties: ['name', 'email']
        };
    }

    initializeSideTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'name',
                header: 'المحافظة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'email',
                header: 'الموقع الالكترونى',
                filter: true,
                filterMode: 'text'
            }
        ];
    }

    initializeSideTableActions(): TableOptions['inputActions'] {
        return [
            {
                name: 'EDIT',
                icon: 'pi pi-file-edit',
                color: 'text-middle',
                isCallBack: true,
                call: (row) => {
                    this.openEdit(row);
                },
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
