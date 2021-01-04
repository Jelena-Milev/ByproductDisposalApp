import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../service/report.service';
import { Report } from '../../../model/report.model';

@Component({
  selector: 'app-search-reports',
  templateUrl: './search-reports.component.html',
  styleUrls: ['./search-reports.component.css'],
})
export class SearchReportsComponent implements OnInit, OnDestroy {
  reportsNumbers: number[] = [];
  private reportSub: Subscription;
  report: Report;

  @Output() selectedReport: EventEmitter<Report> = new EventEmitter<Report>();

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportSub = this.reportService
      .fetchReportsNumbers()
      .subscribe((res) => {
        this.reportsNumbers = res;
        this.reportsNumbers.sort((a: number, b: number) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        });
      });
  }

  ngOnDestroy(): void {
    this.reportSub.unsubscribe();
  }

  onReportNumberSelected(number: string | number) {
    this.reportService.fetchByNumber(number).subscribe((res) => {
      this.report = res;
      this.selectedReport.emit(this.report);
    });
  }
}
