import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeIn } from "ng-animate";
import { Router } from "@angular/router";
import { CurationService } from "../../shared/services/curation/curation.service";
@Component({
  selector: 'app-portal-home',
  templateUrl: './portal-dashboard.component.html',
  styleUrls: ['./portal-dashboard.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class PortalDashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['category', 'curator', 'date', 'time', 'actions'];
  dataSource;
  user: any;
  pieData;
  lineData;
  constructor(public authService: AuthService, private router: Router, public curationService: CurationService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.curationService.getUserActivity(true).subscribe((userActivity) => {
      this.dataSource = new MatTableDataSource<any>(userActivity);
      this.lineData = this.graphUserActivity(userActivity);
      this.dataSource.paginator = this.paginator;
    })

    this.curationService.getUserContributions().subscribe((contributions) => {
      if(contributions.every(obj => obj.value === 0)){
        this.pieData = [];
      } else {
        this.pieData = contributions;
      }
    });
  }

  searchSelect(data){
    if(data.type == 'disease'){
      this.router.navigate(['/portal/curate/' + data.id]);
    }
  }

  /*
    Group by day
   */
  graphUserActivity(userActivity: any) {
    let dates = userActivity.map((activity) => activity.date);
    let counts = {};

    for (let i = 0; i < dates.length; i++) {
      let date = dates[i];
      counts[date] = counts[date] && counts[date].value ? {name: date, value: counts[date].value + 1} : {
        name: date,
        value: 1
      };
    }

    let graphSeries = Object.values(counts);

    return [{
      "name": "Annotations",
      "series": graphSeries
    }]
  }
}
