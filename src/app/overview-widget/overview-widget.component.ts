import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { DataService } from '../helper/data.service';
import { OverviewModel } from './overview.model';

@Component({
  selector: 'app-overview-widget',
  templateUrl: './overview-widget.html',
  styleUrls: ['./overview-widget.css'],
  providers: [ DataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverviewWidgetComponent implements OnInit, OnDestroy {
  overviewModel: OverviewModel = new OverviewModel();

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getYtdData();
    this.subscribeBboPriceData();
  }

  ngOnDestroy(): void {
    this.dataService.bboPriceData.unsubscribe();
  }

  private getYtdData(): void {
    const ytdData = this.dataService.getYtdData('BTC');
    if (ytdData) {
      this.overviewModel.updateYtdData(ytdData);
    }

  }

  private subscribeBboPriceData(): void {
    this.dataService.subscribeBboPriceData();
    this.dataService.bboPriceData.subscribe(data => {
      this.overviewModel.updateBboPrice(data);
      this.cdRef.detectChanges();
    });
  }
}
