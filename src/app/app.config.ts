import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Ensure HttpClient is provided globally
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provides routing globally
    provideHttpClient(), // Provides HttpClient globally
  ],
};
