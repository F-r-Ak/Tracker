import { Routes } from '@angular/router';

export const MaintenanceTypesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/maintenance-types/maintenance-types.component').then(c => c.MaintenanceTypesComponent),
    data: { pageTitle: 'أنواع الصيانة', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-maintenance-types/add-edit-maintenance-types.component').then(c => c.AddEditMaintenanceTypesComponent),
    data: { pageTitle: 'اضافة نوع الصيانة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-maintenance-types/add-edit-maintenance-types.component').then(c => c.AddEditMaintenanceTypesComponent),
    data: { pageTitle: 'تعديل نوع الصيانة', pageType: 'edit' }
  }
];
