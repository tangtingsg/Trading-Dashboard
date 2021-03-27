import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DataService } from '../helper/data.service';
import { OrderbookModel } from './orderbook.model';

@Component({
  selector: 'app-orderbook-widget',
  templateUrl: './orderbook-widget.html',
  styleUrls: ['./orderbook-widget.css'],
  providers: [ DataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderbookWidgetComponent implements OnInit, OnDestroy, OnChanges {
  @Input() symbol: any;
  buyOrderbooks: Array<OrderbookModel> = [];
  sellOrderbooks: Array<OrderbookModel> = [];
  lastModel: OrderbookModel|null = null;

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

  ngOnChanges(change: SimpleChanges): void {
    if (change.symbol) {
      this.symbol = change.symbol.currentValue;
      this.cdRef.detectChanges();
    }
  }

  async initData(): Promise<any> {
    const orderbookSnapshot = await this.dataService.subscribeAndRquOrderBookData();
    for (const orderbook of orderbookSnapshot) {
      this.updateOrderbook(orderbook);
    }
    this.dataService.orderbookData.subscribe(orderbook => {
      this.updateOrderbook(orderbook);
      this.cdRef.detectChanges();
    });
    this.cdRef.detectChanges();
  }

  private updateOrderbook(orderbook: object): void {
    const orderbookModel = new OrderbookModel(orderbook);
    this.lastModel = orderbookModel;
    switch (orderbookModel.side) {
      case 0:
        this.buyOrderbooks.unshift(orderbookModel);
        this.buyOrderbooks.length = Math.min(this.buyOrderbooks.length, 30);
        break;
      case 1:
        this.sellOrderbooks.unshift(orderbookModel);
        this.sellOrderbooks.length = Math.min(this.sellOrderbooks.length, 30);
        break;
      default:
        break;
    }
  }
}
