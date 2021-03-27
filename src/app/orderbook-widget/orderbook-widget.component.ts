import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../helper/data.service';
import { OrderbookModel } from './orderbook.model';
import { Headers } from './constants';

@Component({
  selector: 'app-orderbook-widget',
  templateUrl: './orderbook-widget.html',
  styleUrls: ['./orderbook-widget.css'],
  providers: [ DataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderbookWidgetComponent implements OnInit, OnDestroy {
  buyOrderbooks: Array<OrderbookModel|any> = [];
  sellOrderbooks: Array<OrderbookModel|any> = [];
  lastModel: OrderbookModel|null = null;

  headers = Headers;

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef) {
    }

  ngOnInit(): void {
    this.dataService.orderbookData.subscribe(orderbook => {
      this.updateOrderbook(orderbook);
    });
  }

  ngOnDestroy(): void {
    this.dataService.orderbookData.unsubscribe();
  }

  private updateOrderbook(orderbook: object): void {
    const orderbookModel = new OrderbookModel(orderbook);
    this.lastModel = orderbookModel;
    switch (orderbookModel.side) {
      case 0:
        this.buyOrderbooks.unshift(orderbookModel);
        this.buyOrderbooks.length = Math.min(this.buyOrderbooks.length, 20);
        break;
      case 1:
        this.sellOrderbooks.unshift(orderbookModel);
        this.sellOrderbooks.length = Math.min(this.sellOrderbooks.length, 20);
        break;
      default:
        break;
    }
    this.cdRef.detectChanges();
  }
}
