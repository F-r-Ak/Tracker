import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withViewTransitions, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { ConfigService, errorInterceptor, loadingInterceptor, tokenInterceptor } from './app/core';
import { provideToastr } from 'ngx-toastr';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { bluePreset } from './app/core/themes/primeng-presets/custom-preset';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

const initializerConfigFn = (): any => {
    const configService = inject(ConfigService);
    return configService.loadAppConfig();
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(initializerConfigFn),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        provideAnimations(),
        DialogService,
        DynamicDialogRef,
        DynamicDialogConfig,
        provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
        provideRouter(appRoutes, withViewTransitions()),
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    provideRouter(appRoutes, withViewTransitions()),
        providePrimeNG({
            theme: {
                preset: bluePreset,
                options: {
                    darkModeSelector: false || 'none'
                }
            },
            ripple: true
        }),
        provideToastr({
            toastClass: 'ngx-toastr',
            onActivateTick: true,
            maxOpened: 1,
            autoDismiss: true
        })
    ]
};
