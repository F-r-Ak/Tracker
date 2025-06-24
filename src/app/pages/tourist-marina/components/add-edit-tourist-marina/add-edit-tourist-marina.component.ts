import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, FloatingUnitsService, PrimeAutoCompleteComponent, PrimeDatepickerComponent, UnitTypesService, UnitCategoriesService, TownService, GeoPointsService } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { TouristMarinaTabs } from '../../../../core/enums/tourist-marina-tabs';
import { TouristMarinaService } from '../../../../shared/services/tourist-marina/tourist-marina.service';
import { MarinaOrganizationComponent } from '../marina-organization/marina-organization.component';

@Component({
    selector: 'app-add-edit-tourist-marina',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, TabsModule,MarinaOrganizationComponent],
    templateUrl: './add-edit-tourist-marina.component.html',
    styleUrl: './add-edit-tourist-marina.component.scss'
})
export class AddEditTouristMarinaComponent extends BaseEditComponent implements OnInit {
    selectedGeoPoint: any;
    selectedTown: any;
    filteredTowns: any[] = [];
    filteredGeoPoints: any[] = [];
    touristMarinaId: string = '';
    showTouristMarinaTabs: boolean = false;
    activeTab: TouristMarinaTabs = TouristMarinaTabs.General;
    touristMarinaService: TouristMarinaService = inject(TouristMarinaService);
    geoPointsService: GeoPointsService = inject(GeoPointsService);
    townService: TownService = inject(TownService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditTouristMarina();
            this.touristMarinaId = this.activatedRoute.snapshot.paramMap.get('id') as string;
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            name: ['', Validators.required],
            length: [0, Validators.required],
            Url:['',Validators.required],
            northSide: ['', Validators.required],
            southSide: ['', Validators.required],        
            townId: ['', Validators.required],
            geoPointId: ['', Validators.required],
            note: ['']
        });
    }

    getTowns(event: any) {
        const query = event.query.toLowerCase();
        this.townService.town.subscribe({
            next: (res:any) => {
                this.filteredTowns = res.filter((town: any) => town.nameAr.toLowerCase().includes(query) || town.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المدن');
            }
        });
    }

    getGeoPoints(event: any) {
        const query = event.query.toLowerCase();
        this.geoPointsService.geoPoints.subscribe({
            next: (res) => {
                this.filteredGeoPoints= res.filter((geoPoint: any) => geoPoint.nameAr.toLowerCase().includes(query) || geoPoint.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب الاحداث');
            }
        });
    }

    onTownSelect(event: any) {
        this.selectedTown = event.value;
        this.form.get('townId')?.setValue(this.selectedTown.id);
    }

    onGeoPointSelect(event: any) {
        this.selectedGeoPoint = event.value;
        this.form.get('geoPointId')?.setValue(this.selectedGeoPoint.id);
    }

    get touristMarinaEnum() {
        return TouristMarinaTabs;
    }

    getEditTouristMarina = () => {
        this.touristMarinaService.getEditTouristMarina(this.id).subscribe((touristMarina: any) => {
            console.log('touristMarina',touristMarina);
            this.initFormGroup();
            this.form.patchValue(touristMarina);
            this.fetchTownDetails(touristMarina);
            this.fetchGeoPointDetails(touristMarina);
        });
    };

    fetchTownDetails(touristMarina: any) {
        this.townService.town.subscribe((response: any) => {
            this.filteredTowns = Array.isArray(response) ? response : response.data || [];
            this.selectedTown = this.filteredTowns.find((town: any) => town.id === touristMarina.townId);
            this.form.get('townId')?.setValue(this.selectedTown?.id);
        });
    }

    fetchGeoPointDetails(touristMarina: any) {
        this.geoPointsService.geoPoints.subscribe((response: any) => {
            this.filteredGeoPoints = Array.isArray(response) ? response : response.data || [];
            this.selectedGeoPoint = this.filteredGeoPoints.find((geoPoint: any) => geoPoint.id === touristMarina.geoPointId);
            this.form.get('geoPointId')?.setValue(this.selectedGeoPoint.id);
        });
    }

    submit() {
        if (this.pageType === 'add') {
            this.touristMarinaService.add(this.form.value).subscribe((res: any) => {
                this.touristMarinaId = res.id;
                this.showTouristMarinaTabs = true;
                this.router.navigate(['/pages/tourist-marina/edit/', res.id]);
            });
        }
        if (this.pageType === 'edit') {
            this.touristMarinaService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.redirect();
            });
        }
    }

    override redirect = () => {
        super.redirect('/pages/tourist-marina');
    };
}
