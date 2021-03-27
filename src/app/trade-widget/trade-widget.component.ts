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
    this.dataService.subscribeTradeData();
    this.dataService.bboPriceData.subscribe(data => {
      this.updateTrade(data);
    });
  }

  ngOnDestroy(): void {
    this.dataService.orderbookData.unsubscribe();
  }

  private updateTrade(trade: object): void {
    const tradeModel = new TradeModel(trade);
    this.tradeModels.unshift(tradeModel);
    this.tradeModels.length = Math.min(this.tradeModels.length, 60);
    this.cdRef.detectChanges();
  }
}
