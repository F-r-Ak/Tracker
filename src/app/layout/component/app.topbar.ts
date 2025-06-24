import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { PanelMenuModule } from 'primeng/panelmenu';


@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule,PanelMenuModule,
    ],
    templateUrl: './app.topbar.html',
})
export class AppTopbar implements OnInit{
    items!: MenuItem[];
       panelMenuItems = [
       
        {
            label: 'Profile',
            icon: 'pi pi-user light',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }
            ]
        }
    ];

     
     handleLogOut() {
    localStorage.setItem('id', '');
    localStorage.removeItem('accessToken');
    sessionStorage.clear();
    location.href= '';
  
  }
    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
    ngOnInit(): void {
        this.items = [
            {
                label: 'Files',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Documents',
                        icon: 'pi pi-file',
                        routerLink: ['/files/documents']
                    },
                      {
                        label: 'Documents',
                        icon: 'pi pi-file',
                        routerLink: ['/files/documents']
                    },
               
                ]
            }
        ]
    }
}
