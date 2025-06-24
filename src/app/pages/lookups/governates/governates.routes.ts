import { Routes } from '@angular/router';

export const governates: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/governates/governates.component').then(c => c.Governate),
    data: { pageTitle: 'بيانات المحافظة', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-governate/add-edit-governate.component').then(c => c.AddEditGovernate),
    data: { pageTitle: 'اضافة بيانات المحافظة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-governate/add-edit-governate.component').then(c => c.AddEditGovernate),
    data: { pageTitle: 'تعديل بيانات المحافظة', pageType: 'edit' }
  }
];
