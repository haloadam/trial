import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactOverviewComponent } from './views/contact-overview/contact-overview.component';

const routes: Routes = [
  {
    path: 'contact-overview', component: ContactOverviewComponent,
    loadChildren: () => import('./views/shared.module').then(module => module.SharedModule)
  },
  {
    path: '', redirectTo: 'contact-overview', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
