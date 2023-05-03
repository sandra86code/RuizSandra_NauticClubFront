import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BoatListComponent } from './boat/boat-list/boat-list.component';
import { BoatAddComponent } from './boat/boat-add/boat-add.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BoatUpdateComponent } from './boat/boat-update/boat-update.component';
import { DepartureListComponent } from './departure/departure-list/departure-list.component';
import { DepartureAddComponent } from './departure/departure-add/departure-add.component';
import { DepartureUpdateComponent } from './departure/departure-update/departure-update.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberAddComponent } from './member/member-add/member-add.component';
import { MemberUpdateComponent } from './member/member-update/member-update.component';
import { CaptainListComponent } from './captain/captain-list/captain-list.component';
import { CaptainAddComponent } from './captain/captain-add/captain-add.component';
import { CaptainUpdateComponent } from './captain/captain-update/captain-update.component';
import { RolGuard } from './role-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'boats',
    canActivate: [RolGuard],
    children: [
      { path: '', component:  BoatListComponent, pathMatch: 'full' },
      { path: 'add', component: BoatAddComponent },
      { path: 'update/:id', component: BoatUpdateComponent }
    ]
  },
  {
    path: 'departures',
    canActivate: [RolGuard],
    children: [
      { path: '', component: DepartureListComponent, pathMatch: 'full' },
      { path: 'add', component: DepartureAddComponent },
      { path: 'update/:id', component: DepartureUpdateComponent }
    ]
  },
  {
    path: 'members',
    canActivate: [RolGuard],
    children: [
      { path: '', component: MemberListComponent, pathMatch: 'full' },
      { path: 'add', component: MemberAddComponent },
      { path: 'update/:id', component: MemberUpdateComponent }
    ]
  },
  {
    path: 'captains',
    canActivate: [RolGuard],
    children: [
      { path: '', component: CaptainListComponent, pathMatch: 'full' },
      { path: 'add', component: CaptainAddComponent },
      { path: 'update/:id', component: CaptainUpdateComponent }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
