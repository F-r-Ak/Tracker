import { Routes } from '@angular/router';

export const floatingUnitsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/floating-units/floating-units.component').then(c => c.FloatingUnitsComponent),
    data: { pageTitle: 'بيانات الوحدات العائمة', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-floating-unit/add-edit-floating-unit.component').then(c => c.AddEditFloatingUnitComponent),
    data: { pageTitle: 'إضافة وحدة عائمة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-floating-unit/add-edit-floating-unit.component').then(c => c.AddEditFloatingUnitComponent),
    data: { pageTitle: 'تعديل وحدة عائمة', pageType: 'edit' }
  }
];
