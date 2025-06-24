import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, GeoPointsService } from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';
import { GoogleMapsComponent } from '../../../../../shared/components/google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps'; // Import Google Maps module if needed

@Component({
    selector: 'app-add-edit-geo-point',
    standalone: true,
    imports: [CardModule, GoogleMapsModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-geo-point.component.html',
    styleUrl: './add-edit-geo-point.component.scss'
})
export class AddEditGeoPointComponent extends BaseEditComponent implements OnInit {
    service: GeoPointsService = inject(GeoPointsService);
    dialogService: DialogService = inject(DialogService);
    existingNames: string[] = [];

    googleMap: Boolean = false;
    center: google.maps.LatLngLiteral = { lat: 24.086053859367915, lng: 32.907119283966175 };
    // zoom: number = 8;
    zoom = 12;
    markers = [{ lat: 24.086053859367915, lng: 32.907119283966175 }, { lat: 24.1042282507531, lng: 32.901104905159485 }];

    options: google.maps.MapOptions = {}; // Add this line to define the options property

    constructor(
        override activatedRoute: ActivatedRoute,
        googleText: GoogleMapsModule
    ) {
        console.log('Google Maps Module: ', googleText);
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            console.log('dialog data googleMap: ', element.instance.ddconfig.data.googleMap);
            this.googleMap = element.instance.ddconfig.data.googleMap;

            this.pageType = element.instance.ddconfig.data.pageType;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditGeoPoint();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            code: ['', Validators.required],
            nameEn: ['', Validators.required],
            nameAr: ['', Validators.required],
            north: ['', Validators.required],
            east: ['', Validators.required]
        });
    }

    getEditGeoPoint = () => {
        this.service.getEditGeoPoint(this.id).subscribe((element: any) => {
            this.initFormGroup();
            this.form.patchValue(element);
        });
    };

//     submit() {
//         if (this.pageType === 'add'){
//             console.log('Entered Name:');
//             const enteredName = this.form.get('nameEn')?.value;
// console.log('Entered Name:', enteredName);
//     if (this.existingNames.includes(enteredName)) {
//       alert('هذا الاسم موجود من قبل، قم بتغييره');
//       return;
//     }
//             this.service.add(this.form.value).subscribe(() => {
//                 this.closeDialog();
//             })}
//         if (this.pageType === 'edit')
//             this.service.update({ id: this.id, ...this.form.value }).subscribe(() => {
//                 this.closeDialog();
//             });
//     }
submit() {
  const enteredName = this.form.get('nameEn')?.value?.trim();
console.log('entered name:', enteredName);
console.log('existing names:', this.existingNames);
  if (!enteredName) {
    alert('الاسم مطلوب');
    return;
  }

  
  const isDuplicate = this.existingNames.some(
    name => name.trim().toLowerCase() === enteredName.toLowerCase()
  );

  if (isDuplicate) {
    alert('هذا الاسم موجود من قبل، قم بتغييره');
    return;
  }

  if (this.pageType === 'add') {
    this.service.add(this.form.value).subscribe(() => {
      this.closeDialog();
    });
  } else if (this.pageType === 'edit') {
    this.service.update({ id: this.id, ...this.form.value }).subscribe(() => {
      this.closeDialog();
    });
  }
}

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }

}
