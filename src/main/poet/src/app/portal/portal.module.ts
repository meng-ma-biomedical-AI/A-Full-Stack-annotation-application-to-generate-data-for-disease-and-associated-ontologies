import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDashboardComponent } from './portal-dashboard/portal-dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { PortalRoutingModule } from "./portal-routing.module";
import { PortalCurateComponent } from './portal-curate/portal-curate.component';
import { RouterModule } from "@angular/router";
import { PortalComponent } from './portal/portal.component';
import { TreatmentCurationComponent } from './portal-curate/treatment-curation/treatment-curation.component';
import { HpoCurationComponent } from './portal-curate/hpo-curation/hpo-curation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogSourceComponent } from './portal-curate/dialog-source/dialog-source.component';
import { HttpClientModule } from "@angular/common/http";
import { AnnotationCardComponent } from './portal-curate/annotation-card/annotation-card.component';


@NgModule({
  declarations: [PortalDashboardComponent, PortalCurateComponent, PortalComponent, TreatmentCurationComponent,
    HpoCurationComponent, DialogSourceComponent, AnnotationCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    PortalRoutingModule,
    FlexLayoutModule
  ],
  entryComponents: [DialogSourceComponent]
})
export class PortalModule {
}
