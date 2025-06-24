import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
    SubmitButtonsComponent,
    PrimeAutoCompleteComponent,
    PrimeCheckBoxComponent,
    PrimeDatepickerComponent,
    MarinaTripsService,
} from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';
import { TouristMarinaService } from '../../../../shared/services/tourist-marina/tourist-marina.service';

@Component({
    selector: 'app-add-edit-trip-geo',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeAutoCompleteComponent, PrimeCheckBoxComponent, PrimeDatepickerComponent],
    templateUrl: './add-edit-trip-geo.component.html',
    styleUrl: './add-edit-trip-geo.component.scss'
})
export class AddEditTripGeoComponent extends BaseEditComponent implements OnInit {
    geoPointId = '';
    selectedTouristMarina: any;
    filteredTouristMarinas: any[] = [];
    touristMarinaService: TouristMarinaService = inject(TouristMarinaService);
    marinaTripsService: MarinaTripsService=inject(MarinaTripsService);


    dialogService: DialogService = inject(DialogService);
    tripInformationId: any;

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            // this.tripInformationId = element.instance.ddconfig.data.row.tripInformationId;
            console.log( element.instance.ddconfig.data);
            // this.tripInformationId = element.instance.ddconfig.data.row.tripInformationId;

            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditMarinaTouristMarina();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            geoPointId: [null],
            tripInformationId: [this.tripInformationId],
        });
    }

    getTouristMarinas(body: any) {
        return this.touristMarinaService.getDropDown(body);
    }

    onTouristMarinaSelect(event: any) {
        this.selectedTouristMarina = event.value;
        this.form.get('geoPointId')?.setValue(this.selectedTouristMarina?.id);
    }

    getEditMarinaTouristMarina = () => {
        this.marinaTripsService.getEditMarinaTrip(this.id).subscribe((marinaTrip: any) => {
            this.initFormGroup();
            this.form.patchValue(marinaTrip);
            this.fetchTouristMarinaDetails(marinaTrip.geoPointId);
        });
    };

     fetchTouristMarinaDetails(geoPointId: any) {
        this.touristMarinaService.getTouristMarina(geoPointId).subscribe((TouristMarinaDetails: any) => {
            this.selectedTouristMarina = TouristMarinaDetails.data;
            this.form.patchValue({
                geoPointId: TouristMarinaDetails.id
            });
        });
    }

    submit() {
        if (this.pageType === 'add')
            this.marinaTripsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.marinaTripsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
