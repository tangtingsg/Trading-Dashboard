export class TradeModel {
  price: number|null = null;
  amount: number|null = null;
  time: string|null = null;
  side: number|null = null;
  css = '';

  constructor(trade: any) {
    this.price = trade.price.toFixed(2);
    this.amount = trade.amount;
    this.time = trade.time;
    this.side = trade.side;
    this.css = trade.side ? 'sell' : 'buy';
  }
}
