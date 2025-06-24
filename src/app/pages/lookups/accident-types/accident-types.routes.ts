import { Routes } from '@angular/router';

export const accidentTypesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/accident-types/accident-types.component').then(c => c.AccidentTypesComponent),
    data: { pageTitle: 'أنواع الحوادث', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-accident-type/add-edit-accident-type.component').then(c => c.AddEditAccidentTypeComponent),
    data: { pageTitle: 'اضافة نوع حادث', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-accident-type/add-edit-accident-type.component').then(c => c.AddEditAccidentTypeComponent),
    data: { pageTitle: 'تعديل نوع حادث', pageType: 'edit' }
  }
];
