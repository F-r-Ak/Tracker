import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { GeoPointsService, PrimeDataTableComponent, PrimeTitleToolBarComponent, TripGeoService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces/table/table';
import { FormBuilder } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'; // Import Google Maps module if needed

@Component({
    selector: 'app-trip-geo',
    standalone: true,
    imports: [RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent, GoogleMapsModule],
templateUrl: './trip-geo.component.html',
    styleUrl: './trip-geo.component.scss'
})
export class TripGeosComponent extends BaseListComponent {
    @Input() tripInformationId: string = '';
    tableOptions!: TableOptions;
    sideTableOptions!: TableOptions;
    service = inject(TripGeoService);
    geoPointsService: GeoPointsService = inject(GeoPointsService);
    tripGeoService: TripGeoService = inject(TripGeoService);

    formBuilder: FormBuilder = inject(FormBuilder);

    googleMap: Boolean = false;
    center: google.maps.LatLngLiteral = { lat: 24.086053859367915, lng: 32.907119283966175 };
    zoom = 12;
    markers = [
        { lat: 24.086053859367915, lng: 32.907119283966175 },
        { lat: 24.1042282507531, lng: 32.901104905159485 }
    ];

    // Example: If you want to use scaledSize as a property, declare it like this:
    scaledSize = new google.maps.Size(60, 60);

    //north - lat ,,, east - lang
    currentLocation: { lat: number; lng: number } = { lat: 24.100942734253373, lng: 32.90134858960123 };

    options = {
        strokeColor: '#b51512', // Red line
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#b51512', // Optional: fill color
        fillOpacity: 0.35
    }; // Add this line to define the options property

    polygonPointsAswanGovOptions = {
        strokeColor: '#ffffff', // Red line
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#ffffff', // Optional: fill color
        fillOpacity: 0.25
    }; // Add this line to define the options property

    events!: {
        mainTitle: string;
        subTitle: string;
        image?: string;
        url?: string;
        code?: string;
        address?: string;
        icon?: string;
        color?: string;
        action?: boolean;
        map?: boolean;
        coords?: boolean;
    }[];
    governateInfo: any;
    geoPointId: any;

    constructor(activatedRoute: ActivatedRoute, googleText: GoogleMapsModule) {
        console.log('Google Maps Module: ', googleText);

        navigator.geolocation.getCurrentPosition((position) => {
            console.log('Current Position:', position.coords);
            this.currentLocation.lat = position.coords.latitude;
            this.currentLocation.lng = position.coords.longitude;
        });

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
                getAll: 'v1/tripgeo/getpaged',
                getAllMethod: 'POST',
                delete: 'v1/tripgeo/deletesoft'
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
            responsiveDisplayedProperties: ['tripInformationCode','floatingUnitNameAr', 'geoPointNorth', 'email']
        };
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'tripInformationCode',
                header: 'كود الرحلة',
                filter: true,
                filterMode: 'text'
            },
              {
                field: 'floatingUnitNameAr',
                header: 'اسم الوحدة العائمة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'geoPointNorth',
                header: ' نقطة الشمال',
                filter: true,
                filterMode: 'text'
            },
              {
                field: 'geoPointEast',
                header: 'نقطة الشرق',
                filter: true,
                filterMode: 'text'
            }
        ];
    }

    initializeTableActions(): TableOptions['inputActions'] {
        return [
            {
                name: 'DELETE',
                icon: 'pi pi-trash',
                color: 'text-error',
                allowAll: true,
                isDelete: true
            }
        ];
    }



   postTripGeo() {
    if (!this.geoPointId || !this.tripInformationId) {
        console.error('Missing required IDs',this.geoPointId,this.tripInformationId);
        return;
    }
    this.tripGeoService.add({
        geoPointId: this.geoPointId.toString(),
        tripInformationId: this.tripInformationId.toString(),
    }).subscribe({
        next: (res) => {
            console.log('TripGeo added successfully', res);
            // Add any success handling here
            // Maybe refresh the table data
            this.loadDataFromServer();
        },
        error: (err) => {
            console.error('Error adding TripGeo', err);
            // Add error handling here
        }
    });
}
   openAdd() {
        console.log('Adding new geo point at:', this.currentLocation);
        
        this.geoPointsService.add({
            north: this.currentLocation.lat.toString(),
            east: this.currentLocation.lng.toString(),
            nameEn: 'trip',
            nameAr: 'مركب',
            code: '3'
        }).subscribe({
            next: (res) => {
                console.log('GeoPoint added successfully:', res);
                this.geoPointId = res;
                this.postTripGeo();
            },
            error: (err) => {
                console.error('Failed to add GeoPoint:', err);
                // Show error message to user
            }
        });
    }

    initializeSideTableOptions() {
        this.sideTableOptions = {
            inputUrl: {
                getAll: 'v1/tripgeo/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/tripgeo/deletesoft'
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
                header: 'اسم الرحلة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'email',
                header: 'احداث شمال',
                filter: true,
                filterMode: 'text'
            },
              {
                field: 'email',
                header: 'احداث جنوبي',
                filter: true,
                filterMode: 'text'
            }
        ];
    }

    initializeSideTableActions(): TableOptions['inputActions'] {
        return [
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
