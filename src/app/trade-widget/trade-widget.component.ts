import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../helper/data.service';
import { TradeModel } from './trade.model';

@Component({
  selector: 'app-trade-widget',
  templateUrl: './trade-widget.html',
  styleUrls: ['./trade-widget.css'],
  providers: [ DataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeWidgetComponent implements OnInit, OnDestroy {
  tradeModels: Array<TradeModel> = [];

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef) {
    }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.dataService.orderbookData.unsubscribe();
  }

  async initData(): Promise<any> {
    const tradeSnapshot = await this.dataService.subscribeTradeData();
    for (const trade of tradeSnapshot) {
      this.updateTrade(trade);
    }
    this.dataService.bboPriceData.subscribe(data => {
      this.updateTrade(data);
      this.cdRef.detectChanges();
    });
    this.cdRef.detectChanges();
  }

  private updateTrade(trade: object): void {
    const tradeModel = new TradeModel(trade);
    this.tradeModels.unshift(tradeModel);
    this.tradeModels.length = Math.min(this.tradeModels.length, 60);
  }
}
