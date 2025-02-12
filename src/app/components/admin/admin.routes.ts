import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./admin-login/admin-login.component')
          .then(m => m.AdminLoginComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component')
          .then(m => m.AdminDashboardComponent),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
