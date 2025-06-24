import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, FloatingUnitsService, PrimeAutoCompleteComponent, PrimeDatepickerComponent, UnitTypesService, UnitCategoriesService, TripInformationService, RoutesService, } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { FloatingUnitTabs } from '../../../../core/enums/floating-unit-tabs';
import { MarinaTripsComponent } from '../marina-trips/marina-trips.component';
import { TripGeosComponent } from '../trip-geo/trip-geo.component';
import { TripTabs } from '../../../../core/enums/trip-tabs';

@Component({
    selector: 'app-add-edit-trip-information',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, TabsModule,MarinaTripsComponent,TripGeosComponent],
    templateUrl: './add-edit-trip-information.component.html',
    styleUrl: './add-edit-trip-information.component.scss'
})
export class AddEditTripInformationComponent extends BaseEditComponent implements OnInit {
    selectedRoute: any;
    selectedUnit: any;
    filteredRoutes: any[] = [];
    filteredUnits: any[] = [];
    tripInformationId: string = '';
    showFloatingUnitTabs: boolean = false;
    activeTab: FloatingUnitTabs = FloatingUnitTabs.General;
    floatingUnitsService: FloatingUnitsService = inject(FloatingUnitsService);
    routesService: RoutesService = inject(RoutesService);
    tripInformationService: TripInformationService = inject(TripInformationService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditTripInformation();
            this.tripInformationId = this.activatedRoute.snapshot.paramMap.get('id') as string;
            
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            floatingUnitId: [null, Validators.required],
            staffNumber: [0, Validators.required],
            passengerNumber: [0, Validators.required],
            routeId: [null, Validators.required],
            sartDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });
    }

    getUnits(event: any) {
        const query = event.query.toLowerCase();
        this.floatingUnitsService.floatingUnits.subscribe({
            next: (res) => {
                this.filteredUnits = res.filter((unit: any) => unit.nameAr.toLowerCase().includes(query) || unit.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب الوحدات العائمة');
            }
        });
    }

    getRoutes(event: any) {
        const query = event.query.toLowerCase();
        this.routesService.routes.subscribe({
            next: (res) => {
                this.filteredRoutes = res.filter((  route: any) => route.nameAr.toLowerCase().includes(query) || route.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب خطوط السير');
            }
        });
    }

    onUnitSelect(event: any) {
        this.selectedUnit = event.value;
        this.form.get('floatingUnitId')?.setValue(this.selectedUnit.id);
    }

    onRouteSelect(event: any) {
        this.selectedRoute = event.value;
        this.form.get('routeId')?.setValue(this.selectedRoute.id);
    }

    get tripTabsEnum() {
        return TripTabs;
    }

    getEditTripInformation = () => {
        this.tripInformationService.getEditTripInformation(this.id).subscribe((tripInformation: any) => {
            this.initFormGroup();
            this.form.patchValue(tripInformation);
            this.fetchUnitDetails(tripInformation);
            this.fetchRouteDetails(tripInformation);
        });
    };

    fetchUnitDetails(tripInformation: any) {
        this.floatingUnitsService.floatingUnits.subscribe((response: any) => {
            this.fetchUnitDetails = Array.isArray(response) ? response : response.data || [];
            this.selectedUnit = this.filteredUnits.find((type: any) => type.code === tripInformation.floatingUnitId);
            this.form.get('floatingUnitId')?.setValue(this.selectedUnit?.code);
        });
    }

    fetchRouteDetails(tripInformation: any) {
        this.routesService.routes.subscribe((response: any) => {
            this.filteredRoutes = Array.isArray(response) ? response : response.data || [];
            this.selectedRoute = this.filteredRoutes.find((route: any) => route.id === tripInformation.routeId);
            this.form.get('routeId')?.setValue(this.selectedRoute.id);
        });
    }


    
    submit() {
        if (this.pageType === 'add') {
            this.tripInformationService.add(this.form.value).subscribe((res: any) => {
                this.tripInformationId = res.id;
                this.showFloatingUnitTabs = true;
                this.router.navigate(['/pages/trip-information/edit/', res.id]);
            });
        }
        if (this.pageType === 'edit') {
            this.tripInformationService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.redirect();
            });
        }
    }

    override redirect = () => {
        super.redirect('/pages/trip-information');
    };
}
