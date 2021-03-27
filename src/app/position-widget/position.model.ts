export class PositionModel {
  sybmol = '';
  qty: number|null = null;
  position = '';
  cost = 0;
  price = '';
  pnl = '';
  pnlPercentage = '';
  css = {
    side: '',
    positve: '',
  };

  constructor(positionInfo: any) {
    this.sybmol = positionInfo.sybmol;
    this.qty = positionInfo.qty;
    this.cost = positionInfo.cost;
    this.position = `${positionInfo.position}%`;
  }

  updateCurrentPrice(bboPrice: any): void {
    if (!bboPrice) {
      return;
    }
    this.price = bboPrice.price.toFixed(2);
    const pnl = +(bboPrice.price - this.cost).toFixed(2);
    const positve = pnl > 0 ? '+' : '-';
    this.pnl = `${positve}${pnl}`;
    const pnlPercentage = pnl / this.cost * 100;
    this.pnlPercentage = `${positve}${pnlPercentage.toFixed(2)}%`;
    this.css = {
      side: bboPrice.side ? 'sell' : 'buy',
      positve: pnl > 0 ? 'red' : 'green'
    };
  }
}
