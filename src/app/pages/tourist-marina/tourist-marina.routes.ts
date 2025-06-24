import { Routes } from '@angular/router';

export const TouristMarinaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tourist-marina/tourist-marina.component').then(c => c.TouristMarinaComponent),
    data: { pageTitle: 'بيانات المراسي', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-tourist-marina/add-edit-tourist-marina.component').then(c => c.AddEditTouristMarinaComponent),
    data: { pageTitle: 'إضافة مرسي', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-tourist-marina/add-edit-tourist-marina.component').then(c => c.AddEditTouristMarinaComponent),
    data: { pageTitle: 'تعديل مرسي', pageType: 'edit' }
  }
];
