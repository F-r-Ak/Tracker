import { Routes } from '@angular/router';

export const geoPointsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/geo-points/geo-points.component').then(c => c.GeoPointsComponent),
    data: { pageTitle: 'الاحداثيات', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-geo-point/add-edit-geo-point.component').then(c => c.AddEditGeoPointComponent),
    data: { pageTitle: 'اضافة الاحداثيات', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-geo-point/add-edit-geo-point.component').then(c => c.AddEditGeoPointComponent),
    data: { pageTitle: 'تعديل الاحداثيات', pageType: 'edit' }
  }
];
