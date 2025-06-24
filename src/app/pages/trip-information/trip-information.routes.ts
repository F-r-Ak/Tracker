import { Routes } from '@angular/router';

export const TripInformationRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/trip-information/trip-information.component').then(c => c.TripInformationComponent),
    data: { pageTitle: 'بيانات الرحلات العائمة', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-trip-information/add-edit-trip-information.component').then(c => c.AddEditTripInformationComponent),
    data: { pageTitle: 'إضافة رحلة العائمة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-trip-information/add-edit-trip-information.component').then(c => c.AddEditTripInformationComponent),
    data: { pageTitle: 'تعديل رحلة العائمة', pageType: 'edit' }
  }
];
