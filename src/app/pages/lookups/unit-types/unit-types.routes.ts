import { Routes } from '@angular/router';

export const unitTypesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/unit-types/unit-types.component').then(c => c.UnitTypesComponent),
    data: { pageTitle: 'انواع الوحدات', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-unit-type/add-edit-unit-type.component').then(c => c.AddEditUnitTypeComponent),
    data: { pageTitle: 'اضافة نوع الوحدة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-unit-type/add-edit-unit-type.component').then(c => c.AddEditUnitTypeComponent),
    data: { pageTitle: 'تعديل نوع الوحدة', pageType: 'edit' }
  }
];
