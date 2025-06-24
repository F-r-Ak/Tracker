import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { FloatingUnitStaffService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces/table/table';
import { AddEditFloatingUnitStaffComponent } from '../add-edit-floating-unit-staff/add-edit-floating-unit-staff.component';

@Component({
  selector: 'app-floating-unit-staff',
  standalone: true,
  imports: [ RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './floating-unit-staff.component.html',
  styleUrl: './floating-unit-staff.component.scss'
})
export class FloatingUnitStaffComponent extends BaseListComponent {
  @Input() floatingUnitId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(FloatingUnitStaffService);

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
        getAll: 'floatingunitstaffs/getpaged',
        getAllMethod: 'POST',
        delete: 'floatingunitstaffs/deletesoft'
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
          "floatingUnitId": this.floatingUnitId
        }
      },
      responsiveDisplayedProperties: ['identity', 'idType', 'name', 'nationalityNameAr', 'job', 'mobile', 'email']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field:  'identity',
        header: 'رقم البطاقة/الجواز',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'idType',
        header: 'نوعه',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'name',
        header: 'الاسم',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'nationalityNameAr',
        header: 'الجنسية',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'job',
        header: 'الوظيفة',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'mobile',
        header: 'المحمول',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'email',
        header: 'البريد الالكتروني',
        filter: true,
        filterMode: 'text'
      }
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
    this.openDialog(AddEditFloatingUnitStaffComponent, 'إضافة طاقم عمل', {
      pageType: 'add',
      row: { floatingUnitId: this.floatingUnitId }
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditFloatingUnitStaffComponent, 'تعديل طاقم عمل', {
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
