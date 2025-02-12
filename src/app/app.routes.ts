import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { ADMIN_ROUTES } from './components/admin/admin.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./components/gallery/gallery.component')
      .then(m => m.GalleryComponent)
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component')
      .then(m => m.ContactComponent)
  },
  ...ADMIN_ROUTES,
  {
    path: '**',
    redirectTo: ''
  }
];
