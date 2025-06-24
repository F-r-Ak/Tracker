import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { MarinaTripsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces/table/table';
import { AddEditMarinaTripComponent } from '../add-edit-marina-trip/add-edit-marina-trip.component';

@Component({
  selector: 'app-marina-trips',
  standalone: true,
  imports: [ RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './marina-trips.component.html',
  styleUrl: './marina-trips.component.scss'
})
export class MarinaTripsComponent extends BaseListComponent {
  @Input() tripInformationId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(MarinaTripsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'v1/marinatrips/getpaged',
        getAllMethod: 'POST',
        delete: 'v1/marinatrips/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SONO-TRACKER-FLOATING-UNIT-STAFF',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {
          "tripInformationId": this.tripInformationId
        }
      },
      responsiveDisplayedProperties: ['touristMarinaName']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
     
      {
        field: 'touristMarinaName',
        header: 'اسم المرسي',
        filter: true,
        filterMode: 'text'
      },
    ];
  }

  initializeTableActions(): TableOptions['inputActions'] {
    return [
      {
        name: 'Edit',
        icon: 'pi pi-file-edit',
        color: 'text-middle',
        isCallBack: true,
        call: row => {
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
    this.openDialog(AddEditMarinaTripComponent, 'إضافة طاقم عمل', {
      pageType: 'add',
      row: { tripInformationId: this.tripInformationId }
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditMarinaTripComponent, 'تعديل طاقم عمل', {
      pageType: 'edit',
      row: { rowData }
    });
  }

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
