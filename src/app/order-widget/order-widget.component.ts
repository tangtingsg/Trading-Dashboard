import { Component, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { OrderModel } from './order.model';

@Component({
  selector: 'app-order-widget',
  templateUrl: './order-widget.html',
  styleUrls: ['./order-widget.css'],
})
export class OrderWidgetComponent implements OnDestroy, OnChanges {
  @Input() symbol: any;

  buyOrderModel = new OrderModel();
  sellOrderModel = new OrderModel();

  constructor() {}

  ngOnChanges(change: SimpleChanges): void {
    if (change.symbol) {
      this.symbol = change.symbol.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.buyOrderModel.clearTimeout();
    this.sellOrderModel.clearTimeout();
  }

  placeBuyOrder(): void {
    this.buyOrderModel.placeOrder('BUY');
  }

  placeSellOrder(): void {
    this.sellOrderModel.placeOrder('SELL');
  }
}
