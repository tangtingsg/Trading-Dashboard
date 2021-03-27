export class PositionModel {
  symbol = '';
  qty: number|string = '';
  mktValue = 'N.A';
  cost = '';
  costDisplay = '';
  price = 'N.A';
  pnl = 'N.A';
  pnlPencentage = '0.00';
  css = '';

  constructor(position: any) {
    this.symbol = position.symbol;
    this.qty = position.qty;
    this.cost = position.cost;
    this.costDisplay = this.formateNumber(position.cost);
  }

  updatePrice(bbo: any): void {
    this.price = this.formateNumber(bbo.price);
    this.mktValue = this.formateNumber(+bbo.price * +this.qty);
    const pnl = +bbo.price - +this.cost;
    this.pnl = pnl.toFixed(2);
    const pnlPencentage = pnl / +this.cost * 100;
    this.pnlPencentage = pnlPencentage.toFixed(2);
    this.css = pnl === 0 ? '' : (pnl > 0 ? 'green' : 'red');
  }

  private formateNumber(value: number): string {
    return Number(value.toFixed(2)).toLocaleString();
  }

}
