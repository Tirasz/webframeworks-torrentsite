import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { OwnerGuard } from './shared/services/owner.guard';

// lazy-loading
const routes: Routes = [
  {
    path: 'browser',
    loadChildren: () => import('./pages/browser/browser.module').then(m => m.BrowserModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: 'create-torrent', loadChildren: () => import('./pages/create-torrent/create-torrent.module').then(m => m.CreateTorrentModule), canActivate: [AuthGuard] },
  { path: 'edit-torrent/:id', loadChildren: () => import('./pages/edit-torrent/edit-torrent.module').then(m => m.EditTorrentModule), canActivate:[AuthGuard, OwnerGuard]},
  { path: 'torrent/:id', loadChildren: () => import('./pages/torrent/torrent.module').then(m => m.TorrentModule), canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/browser',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }