import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { InboxManagementComponent } from './inbox-management/inbox-management.component';

export default [
    {
        path: 'lookups',
        children: [
            {
                path: 'governates',
                loadChildren: () => import('./lookups/governates/governates.routes').then((m) => m.governates)
            },
            {
                path: 'accident-types',
                loadChildren: () => import('./lookups/accident-types/accident-types.routes').then((m) => m.accidentTypesRoutes)
            },
            {
                path: 'cities',
                loadChildren: () => import('./lookups/cities/cities.routes').then((m) => m.CitiesRoutes)
            },
            {
                path: 'town',
                loadChildren: () => import('./lookups/town/town.routes').then((m) => m.TownRoutes)
            },
            {
                path: 'nationalities',
                loadChildren: () => import('./lookups/nationalities/nationalities.routes').then((m) => m.nationalitiesRoutes)
            },
            {
                path: 'unit-types',
                loadChildren: () => import('./lookups/unit-types/unit-types.routes').then((m) => m.unitTypesRoutes)
            },
            {
                path: 'routes',
                loadChildren: () => import('./lookups/routes/routes.routes').then((m) => m.routesRoutes)
            },
            {
                path: 'maintenance-types',
                loadChildren: () => import('./lookups/maintenanceTypes/maintenance-types.routes').then((m) => m.MaintenanceTypesRoutes)
            },
            {
                path: 'inspection-types',
                loadChildren: () => import('./lookups/inspection-types/inspection-types.routes').then((m) => m.inspectionTypesRoutes)
            },
            {
                path: 'geo-points',
                loadChildren: () => import('./lookups/geo-points/geo-points.routes').then((m) => m.geoPointsRoutes)
            }
        ]
    },
    {
        path: 'org-info',
        loadChildren: () => import('./org-info/org-info.routes').then((m) => m.orgInfoRoutes),
        data: {  }
    },
    {
        path: 'org-owner-companies',
        loadChildren: () => import('./org-owner-companies/org-owner-companies.routes').then((m) => m.orgOwnerCompaniesRoutes),
        data: {  }
    },
    {
        path: 'org-operator-companies',
        loadChildren: () => import('./org-operator-companies/org-operator-companies.routes').then((m) => m.orgOperatorCompaniesRoutes),
        data: {  }
    },
    {
        path: 'floating-units',
        loadChildren: () => import('./floating-units/floating-units.routes').then((m) => m.floatingUnitsRoutes),
        data: { }
    },
    {
        path: 'trip-information',
        loadChildren: () => import('./trip-information/trip-information.routes').then((m) => m.TripInformationRoutes),
        data: {  }
    },
    {
        path: 'tourist-marina',
        loadChildren: () => import('./tourist-marina/tourist-marina.routes').then((m) => m.TouristMarinaRoutes),
        data: { }
    },
    {
        path: 'correspondences',
        children: [{ path: 'inboxManagement', component: InboxManagementComponent }]
    },
    

    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
