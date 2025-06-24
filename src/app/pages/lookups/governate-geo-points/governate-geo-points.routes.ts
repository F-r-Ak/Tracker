import { Routes } from '@angular/router';

export const governateGeoPoints: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/governate-geo-points/governate-geo-points.component').then((c) => c.GovernateGeoPoint),
        data: { pageTitle: 'احداثيات المحافظة', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-governate-geo-point/add-edit-governate-geo-point.component').then((c) => c.AddEditGovernateGeoPoint),
        data: { pageTitle: 'اضافة احداثيات المحافظة', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-governate-geo-point/add-edit-governate-geo-point.component').then((c) => c.AddEditGovernateGeoPoint),
        data: { pageTitle: 'تعديل احداثيات المحافظة', pageType: 'edit' }
    }
];
