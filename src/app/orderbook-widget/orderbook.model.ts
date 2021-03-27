export class OrderbookModel {
  price: number|null = null;
  amount: number|null = null;
  total: string|null = null;
  side: number|null = null;
  css = '';

  constructor(order: any) {
    this.price = order.price.toFixed(2);
    this.amount = order.amount.toFixed(5);
    this.total = (order.price * order.amount).toFixed(5);
    this.side = order.side;
    this.css = this.side ? 'sell' : 'buy';
  }
}
