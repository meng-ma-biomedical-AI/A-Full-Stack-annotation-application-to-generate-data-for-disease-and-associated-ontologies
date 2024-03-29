import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalCurateComponent } from "./portal-curate/portal-curate.component";
import { PortalComponent } from "./portal/portal.component";
import { PortalDashboardComponent } from './portal-dashboard/portal-dashboard.component';


const routes: Routes = [
  {
    path: '', component: PortalComponent, children: [
      {path: 'dashboard', component: PortalDashboardComponent},
      {path: 'curate', component: PortalCurateComponent},
      {path: 'curate/:id', component: PortalCurateComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule {

}
