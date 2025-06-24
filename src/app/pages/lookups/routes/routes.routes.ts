import { Routes } from '@angular/router';

export const routesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/routes/routes.component').then(c => c.RoutesComponent),
    data: { pageTitle: 'خطوط السير', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-route/add-edit-route.component').then(c => c.AddEditRouteComponent),
    data: { pageTitle: 'اضافة خط السير', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-route/add-edit-route.component').then(c => c.AddEditRouteComponent),
    data: { pageTitle: 'تعديل خط السير', pageType: 'edit' }
  }
];
