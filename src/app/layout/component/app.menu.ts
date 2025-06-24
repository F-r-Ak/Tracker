import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'الرئيسية',
                items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'الاعدادات',
                icon: 'pi pi-fw pi-briefcase',
                // routerLink: ['/pages'],
                items: [
                    {
                        label: 'أنواع الحوادث',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/accident-types']
                    },
                    {
                        label: ' المراكز',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/cities']
                    },
                    {
                        label: ' المدن',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/town']
                    },
                    {
                        label: 'الجنسيات',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/nationalities']
                    },
                    {
                        label: 'انواع الوحدات',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/unit-types']
                    },
                    {
                        label: 'خطوط السير',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/routes']
                    },
                    {
                        label: 'أنواع الصيانة',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/maintenance-types']
                    },
                    {
                        label: 'انواع التفتيش',
                        icon: 'pi pi-fw pi-tag',
                        routerLink: ['/pages/lookups/inspection-types']
                    }
                    // {
                    //     label: 'الاحداثيات',
                    //     icon: 'pi pi-fw pi-tag',
                    //     routerLink: ['/pages/lookups/geo-points']
                    // }
                ]
            },
            {
                label: 'بيانات',
                icon: 'pi pi-fw pi-briefcase',
                // routerLink: ['/pages'],
                items: [
                    {
                        label: 'بيانات المحافظة',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/lookups/governates']
                    },
                    {
                        label: 'بيانات الجهات',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/org-info']
                    },
                    {
                        label: 'الشركات المالكة',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/org-owner-companies']
                    },
                    {
                        label: 'شركات التشغيل',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/org-operator-companies']
                    },
                    {
                        label: 'بيانات الوحدة العائمة',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/floating-units']
                    },
                    {
                        label: 'بيانات الرحلة العائمة',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/trip-information']
                    },
                     {
                        label: 'بيانات المراسي السياحية',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/tourist-marina']
                    }
                ]
            },
            {
                label: 'المراسلات',
                icon: 'pi pi-fw pi-briefcase',
                // routerLink: ['/pages'],
                items: [
                    {
                        label: 'إدارة الوارد',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/correspondences/inboxManagement']
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            {
                label: 'الصفحات الاساسية',
                items: [
                    { label: 'اشكال الادخال', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sono-tracker',
                        target: '_blank'
                    }
                ]
            }
        ];
    }
}
