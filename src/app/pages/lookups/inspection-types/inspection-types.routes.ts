import { Routes } from '@angular/router';

export const inspectionTypesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/inspection-types/inspection-types.component').then(c => c.InspectionTypesComponent),
    data: { pageTitle: 'انواع التفتيش', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-inspection-type/add-edit-inspection-type.component').then(c => c.AddEditInspectiontypeComponent),
    data: { pageTitle: 'اضافة نوع التفتيش', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-inspection-type/add-edit-inspection-type.component').then(c => c.AddEditInspectiontypeComponent),
    data: { pageTitle: 'تعديل نوع التفتيش', pageType: 'edit' }
  }
];
