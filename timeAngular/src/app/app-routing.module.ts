import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {ClockingComponent} from "./clocking/clocking.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {AuthGuardServiceAdmin} from "./service/AuthGuardServiceAdmin";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path:'registration', component: RegistrationComponent},
  {path:'login', component: LoginComponent},
  {path:'admin', component: AdminComponent, canActivate:[AuthGuardServiceAdmin]},
  {path:'clocking', component: ClockingComponent},
  {path:'statistic', component: StatisticComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

