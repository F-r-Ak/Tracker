import { Routes } from '@angular/router';

export const orgOwnerCompaniesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/org-owner-companies/org-owner-companies.component').then(c => c.OrgOwnerCompaniesComponent),
    data: { pageTitle: 'بيانات الشركات المالكة', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-org-owner-company/add-edit-org-owner-company.component').then(c => c.AddEditOrgOwnerCompanyComponent),
    data: { pageTitle: 'إضافة شركة مالكة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-org-owner-company/add-edit-org-owner-company.component').then(c => c.AddEditOrgOwnerCompanyComponent),
    data: { pageTitle: 'تعديل شركة مالكة', pageType: 'edit' }
  }
];
