import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { OrganizationStaffService, PrimeDataTableComponent, PrimeTitleToolBarComponent, AddEditOrganizationStaffComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces/table/table';

@Component({
  selector: 'app-organization-staff',
  standalone: true,
  imports: [ RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './organization-staff.component.html',
  styleUrl: './organization-staff.component.scss'
})
export class OrganizationStaffComponent extends BaseListComponent {
  @Input() organizationId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(OrganizationStaffService);

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
        getAll: 'organizationstaffs/getpaged',
        getAllMethod: 'POST',
        delete: 'organizationstaffs/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SONO-TRACKER-ORGANIZATION-STAFF',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {
          "organizationId": this.organizationId
        }
      },
      responsiveDisplayedProperties: ['identity', 'idType', 'name', 'nationalityNameAr', 'job', 'mobile', 'email']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'name',
        header: 'اسم المسئول',
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
        field: 'phone',
        header: 'هاتف مباشر',
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
    this.openDialog(AddEditOrganizationStaffComponent, 'إضافة بيانات المسئول', {
      pageType: 'add',
      row: { organizationId: this.organizationId }
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditOrganizationStaffComponent, 'تعديل بيانات المسئول', {
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
