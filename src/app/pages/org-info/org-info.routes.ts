import { Routes } from '@angular/router';

export const orgInfoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/org-info/org-info.component').then(c => c.OrgInfoComponent),
    data: { pageTitle: 'بيانات الجهات ', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-org-info/add-edit-org-info.component').then(c => c.AddEditOrgInfoComponent),
    data: { pageTitle: 'إضافة جهة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-org-info/add-edit-org-info.component').then(c => c.AddEditOrgInfoComponent),
    data: { pageTitle: 'تعديل جهة', pageType: 'edit' }
  }
];
