import { Routes } from '@angular/router';

export const TownRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/town/town.component').then(c => c.TownComponent),
    data: { pageTitle: ' المدن', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-town/add-edit-town.component').then(c => c.AddEditTownComponent),
    data: { pageTitle: 'اضافة  مدينة', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-town/add-edit-town.component').then(c => c.AddEditTownComponent),
    data: { pageTitle: 'تعديل  مدينة', pageType: 'edit' }
  }
];
