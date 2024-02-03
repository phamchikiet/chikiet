import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './admin/users/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(), 
    provideRouter(appRoutes), 
    provideAnimations(),
    AuthService,
  ],
};
