import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { ReportService } from '../../../service/report.service';
import { Report } from '../../../model/report.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../state';
import {selectReportsNumbers, selectSelectedReport} from '../../state/report.selectors';
import {getReportById, loadReportsNumbers} from '../../state/report.actions';

@Component({
  selector: 'app-search-reports',
  templateUrl: './search-reports.component.html',
  styleUrls: ['./search-reports.component.css'],
})
export class SearchReportsComponent implements OnInit {
  reportsNumbers$: Observable<number[]>;
  selectedReport$: Observable<Report>;

  @Output() selectedReport: EventEmitter<Report> = new EventEmitter<Report>();

  constructor(private store: Store<AppState>) {
    this.reportsNumbers$ = this.store.select(selectReportsNumbers);
    this.selectedReport$ = this.store.select(selectSelectedReport);
  }

  ngOnInit(): void {
    this.store.dispatch(loadReportsNumbers());
  }


  onReportNumberSelected(id: number) {
    this.store.dispatch(getReportById({ id }));
    this.selectedReport$.subscribe(report => this.selectedReport.emit(report));
  }
}
