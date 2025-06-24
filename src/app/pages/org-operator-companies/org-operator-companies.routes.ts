import { Routes } from '@angular/router';

export const orgOperatorCompaniesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/org-operator-companies/org-operator-companies.component').then(c => c.OrgOperatorCompaniesComponent),
    data: { pageTitle: 'بيانات الشركات المشغلة', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-org-operator-company/add-edit-org-operator-company.component').then(c => c.AddEditOrgOperatorCompanyComponent),
    data: { pageTitle: 'إضافة شركة مشغلة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-org-operator-company/add-edit-org-operator-company.component').then(c => c.AddEditOrgOperatorCompanyComponent),
    data: { pageTitle: 'تعديل شركة مشغلة', pageType: 'edit' }
  }
];
