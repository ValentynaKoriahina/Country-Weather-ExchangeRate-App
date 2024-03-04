import { Routes } from '@angular/router';
import { CountryDetailsPage } from './country-details/country-details.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'countries',
    loadComponent: () => import('./countries/countries.page').then( m => m.CountriesPage)
  },
  {
    path: 'country-details',
    loadComponent: () => import('./country-details/country-details.page').then( m => m.CountryDetailsPage)
  },
  { 
    path: 'country-details/:cca2',
    component: CountryDetailsPage // use dynamic segment :cca2 for country identification
  }, 
];
