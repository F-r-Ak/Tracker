import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, FloatingUnitsService, PrimeAutoCompleteComponent, PrimeDatepickerComponent, UnitTypesService, UnitCategoriesService } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { FloatingUnitTabs } from '../../../../core/enums/floating-unit-tabs';
import { FloatingUnitStaffComponent } from "../floating-unit-staff/floating-unit-staff.component";
import { FloatingUnitOrganizationsComponent } from "../floating-unit-organizations/floating-unit-organizations.component";

@Component({
    selector: 'app-add-edit-floating-unit',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, TabsModule, FloatingUnitStaffComponent, FloatingUnitOrganizationsComponent],
    templateUrl: './add-edit-floating-unit.component.html',
    styleUrl: './add-edit-floating-unit.component.scss'
})
export class AddEditFloatingUnitComponent extends BaseEditComponent implements OnInit {
    selectedUnitType: any;
    selectedUnitCategory: any;
    filteredUnitTypes: any[] = [];
    filteredUnitCategories: any[] = [];
    floatingUnitId: string = '';
    showFloatingUnitTabs: boolean = false;
    activeTab: FloatingUnitTabs = FloatingUnitTabs.General;
    floatingUnitsService: FloatingUnitsService = inject(FloatingUnitsService);
    unitTypesService: UnitTypesService = inject(UnitTypesService);
    unitCategoriesService: UnitCategoriesService = inject(UnitCategoriesService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditFloatingUnits();
            this.floatingUnitId = this.activatedRoute.snapshot.paramMap.get('id') as string;
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
            licenseNumber: ['', Validators.required],
            length: [0, Validators.required],
            width: [0, Validators.required],
            passengerNumber: [0, Validators.required],
            roomNumber: [0, Validators.required],
            manufactureYear: ['', Validators.required],
            lastMaintenanceDate: [''],
            nextMaintenanceDate: [''],
            unitCategory: ['', Validators.required],
            unitTypeId: ['', Validators.required]
        });
    }

    getUnitCategories(event: any) {
        const query = event.query.toLowerCase();
        this.unitCategoriesService.unitCategories.subscribe({
            next: (res) => {
                this.filteredUnitCategories = res.filter((unitCategory: any) => unitCategory.nameAr.toLowerCase().includes(query) || unitCategory.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الفئات');
            }
        });
    }

    getUnitTypes(event: any) {
        const query = event.query.toLowerCase();
        this.unitTypesService.unitTypes.subscribe({
            next: (res) => {
                this.filteredUnitTypes = res.filter((unitType: any) => unitType.nameAr.toLowerCase().includes(query) || unitType.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات أنواع الوحدات');
            }
        });
    }

    onUnitCategorySelect(event: any) {
        this.selectedUnitCategory = event.value;
        this.form.get('unitCategory')?.setValue(this.selectedUnitCategory?.code);
    }

    onUnitTypeSelect(event: any) {
        this.selectedUnitType = event.value;
        this.form.get('unitTypeId')?.setValue(this.selectedUnitType.id);
    }

    get floatingUnitEnum() {
        return FloatingUnitTabs;
    }

    getEditFloatingUnits = () => {
        this.floatingUnitsService.getEditFloatingUnit(this.id).subscribe((floatingUnits: any) => {
            this.initFormGroup();
            this.form.patchValue(floatingUnits);
            this.fetchUnitCategoryDetails(floatingUnits);
            this.fetchUnitTypeDetails(floatingUnits);
        });
    };

    fetchUnitCategoryDetails(floatingUnits: any) {
        this.unitCategoriesService.unitCategories.subscribe((response: any) => {
            this.filteredUnitCategories = Array.isArray(response) ? response : response.data || [];
            this.selectedUnitCategory = this.filteredUnitCategories.find((type: any) => type.code === floatingUnits.unitCategory);
            this.form.get('unitCategory')?.setValue(this.selectedUnitCategory?.code);
        });
    }

    fetchUnitTypeDetails(floatingUnits: any) {
        this.unitTypesService.unitTypes.subscribe((response: any) => {
            this.filteredUnitTypes = Array.isArray(response) ? response : response.data || [];
            this.selectedUnitType = this.filteredUnitTypes.find((unitType: any) => unitType.id === floatingUnits.unitTypeId);
            this.form.get('unitTypeId')?.setValue(this.selectedUnitType.id);
        });
    }

    submit() {
        if (this.pageType === 'add') {
            this.floatingUnitsService.add(this.form.value).subscribe((res: any) => {
                this.floatingUnitId = res.id;
                this.showFloatingUnitTabs = true;
                this.router.navigate(['/pages/floating-units/edit/', res.id]);
            });
        }
        if (this.pageType === 'edit') {
            this.floatingUnitsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.redirect();
            });
        }
    }

    override redirect = () => {
        super.redirect('/pages/floating-units');
    };
}
