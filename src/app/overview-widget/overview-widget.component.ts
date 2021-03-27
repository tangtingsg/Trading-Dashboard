import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../helper/data.service';
import { OverviewModel } from './overview.model';

@Component({
  selector: 'app-overview-widget',
  templateUrl: './overview-widget.html',
  styleUrls: ['./overview-widget.css'],
  providers: [ DataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverviewWidgetComponent implements OnInit, OnDestroy, OnChanges {
  @Input() symbol: any;
  overviewModel: OverviewModel = new OverviewModel();

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.dataService.clearBboInterval();
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change.symbol) {
      this.symbol = change.symbol.currentValue;
      this.initData();
      this.cdRef.detectChanges();
    }
  }

  private initData(): void {
    this.overviewModel = new OverviewModel();
    this.getYtdData();
    this.subscribeBboPriceData();
  }

  private getYtdData(): void {
    const ytdData = this.dataService.getYtdData(this.symbol.symbol);
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
