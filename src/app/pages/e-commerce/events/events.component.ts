import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../../../graphql/queries';

@Component({
  selector: 'ngx-events',
  styleUrls: ['./events.component.scss'],
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  selectedEvent: any;
  isSingleView = false;
  events: any[];
  logos: string[];
  donations: any[];
  actionSize: NbComponentSize = 'medium';

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
  ) {
  }

  ngOnInit() {
    this.getEvents();
    // this.getReportService();
    this.getDonations();
    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? 'medium' : 'small';
      });
  }

  async getReportService() {
    const data = await API.graphql(graphqlOperation(
      queries.reportsForService, {serviceId: 'f92b4052-0567-41c0-9ef7-de2915dadda6'}));
    console.log(data);
  }

  async getEvents() {
    const data = await API.graphql(graphqlOperation(queries.listEvents));
    this.events = data.data.listEvents.items;
    if (this.events) {
      this.selectedEvent = this.events[0];
      this.logos = this.events.map( e => e.logo.replace(/ /g, '%20'));
    }
    console.log(this.logos);
  }

  async getDonations() {
    const data = await API.graphql(graphqlOperation(queries.listDonations));
    this.donations = data.data.listDonations.items;
    console.log(this.donations);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectEvent(event: any) {
    this.selectedEvent = event;
    this.selectedEvent.logo = event.logo.replace(/ /g, '%20');
    this.isSingleView = true;
  }
}
