import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/component/component-routing.module').then(
        (mod) => mod.componentRoute
      ),
  },

  { path: '**', redirectTo: 'login' },
];
