import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { OrderComponent } from './pages/order/order.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign up page',
  },
  {
    path: 'order',
    component: OrderComponent,
    title: 'order page',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
