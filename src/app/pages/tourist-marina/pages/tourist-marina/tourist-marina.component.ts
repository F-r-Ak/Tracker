import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../shared/interfaces';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent} from '../../../../shared';
import { TouristMarinaService } from '../../../../shared/services/tourist-marina/tourist-marina.service';

@Component({
    selector: 'app-tourist-marina',
    imports: [RouterModule, FormsModule, ReactiveFormsModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './tourist-marina.component.html',
    styleUrl: './tourist-marina.component.scss'
})
export class TouristMarinaComponent extends BaseListComponent {
    tableOptions!: TableOptions;
    service = inject(TouristMarinaService);
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
                getAll: 'touristmarina/getPaged',
                getAllMethod: 'POST',
                delete: 'touristmarina/delete'
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'SONO-TRACKER-TOURIST-MARINA',
                allowAll: true,
                listOfPermissions: []
            },
            bodyOptions: {
                filter: {}
            },
            responsiveDisplayedProperties: ['code', 'name','url','length','northSide','southSide','note']
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
                header: 'اسم المرسي',
                filter: true,
                filterMode: 'text'
            },
            // {
            //     field: 'url',
            //     header: 'موقع المرسي',
            //     filter: true,
            //     filterMode: 'text'
            // },
            {
                field: 'length',
                header: 'الطول',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'northSide',
                header: 'الحد البحري',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'southSide',
                header: 'الحد القبلي',
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
                route: '/pages/tourist-marina/edit/',
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
