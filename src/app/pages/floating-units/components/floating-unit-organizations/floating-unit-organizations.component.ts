import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { FloatingUnitOrganizationsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces/table/table';
import { AddEditFloatingUnitOrganizationComponent } from '../add-edit-floating-unit-organization/add-edit-floating-unit-organization.component';

@Component({
  selector: 'app-floating-unit-organizations',
  standalone: true,
  imports: [ RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './floating-unit-organizations.component.html',
  styleUrl: './floating-unit-organizations.component.scss'
})
export class FloatingUnitOrganizationsComponent extends BaseListComponent {
  @Input() floatingUnitId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(FloatingUnitOrganizationsService);

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
        getAll: 'floatingunitorganizations/getPaged',
        getAllMethod: 'POST',
        delete: 'floatingunitorganizations/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SONO-TRACKER-FLOATING-UNIT-ORGANIZATIONS',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {
          "floatingUnitId": this.floatingUnitId
        }
      },
      responsiveDisplayedProperties: ['organizationNameAr', 'organizationType.nameAr']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field:  'organizationNameAr',
        header: 'الشركات المالكة/المشغلة',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'organizationType.nameAr',
        header: 'النوع',
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
    this.openDialog(AddEditFloatingUnitOrganizationComponent, 'إضافة بيانات الملكية والتشغيل', {
      pageType: 'add',
      row: { floatingUnitId: this.floatingUnitId }
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditFloatingUnitOrganizationComponent, 'تعديل بيانات الملكية والتشغيل', {
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
