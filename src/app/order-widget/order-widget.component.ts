import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderModel } from './order.model';

@Component({
  selector: 'app-order-widget',
  templateUrl: './order-widget.html',
  styleUrls: ['./order-widget.css'],
})
export class OrderWidgetComponent implements OnDestroy {

  buyOrderModel = new OrderModel();
  sellOrderModel = new OrderModel();

  constructor() {}

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
