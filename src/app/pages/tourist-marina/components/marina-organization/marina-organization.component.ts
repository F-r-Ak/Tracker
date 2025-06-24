import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { MarinaOrganizationService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces/table/table';
import { AddEditMarinaMrganizationComponent } from '../add-edit-marina-organization/add-edit-marina-organization.component';

@Component({
  selector: 'app-marina-organization',
  standalone: true,
  imports: [ RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './marina-organization.component.html',
  styleUrl: './marina-organization.component.scss'
})
export class MarinaOrganizationComponent extends BaseListComponent {
  @Input() touristMarinaId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(MarinaOrganizationService);

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
        getAll: 'marinaorganization/getpaged',
        getAllMethod: 'POST',
        delete: 'marinaorganization/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SONO-TRACKER-Marina-ORGANIZATION',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {
          "touristMarinaId": this.touristMarinaId
        }
      },
      responsiveDisplayedProperties: ['identity', 'idType', 'name', 'nationalityNameAr', 'job', 'mobile', 'email']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field:  'organizationNameAr',
        header: 'الشركة الماكة',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'isActive',
        header: 'نشط',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'licenseNumber',
        header: 'رقم الترخيص',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'fromDate',
        header: 'من تاريخ',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'toDate',
        header: 'إلي تاريخ',
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
    this.openDialog(AddEditMarinaMrganizationComponent, 'إضافة بيان ملكية', {
      pageType: 'add',
      row: { touristMarinaId: this.touristMarinaId }
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditMarinaMrganizationComponent, 'تعديل بيان ملكية', {
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
