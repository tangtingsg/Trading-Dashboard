export class OverviewModel {
  sybmol = '';
  price = '';
  close = 0;
  closeDisplay = '';
  high = '';
  low = '';
  volume = '';
  change = '';
  changePercentage = '';
  css = {
    side: '',
    positive: ''
  };

  updateYtdData(ytdData: any): void{
    this.close = ytdData.close;
    this.closeDisplay = this.formateNumber(ytdData.close);
    this.high = this.formateNumber(ytdData.high);
    this.low = this.formateNumber(ytdData.low);
    this.volume = this.formateNumber(ytdData.volume);
  }

  private formateNumber(value: number): string {
    return Number(value.toFixed(2)).toLocaleString();
  }


  updateBboPrice(bboPrice: any): void {
    if (!bboPrice) {
      return;
    }
    this.price = bboPrice.price.toFixed(2);
    this.css.side = bboPrice.side ? 'sell' : 'buy';
    const change = +this.price - +this.close;
    this.change = this.formateNumber(change);
    this.changePercentage= (change / +this.close * 100).toFixed(2);
    this.css.positive = change > 0 ? 'green' : 'red';
  }
}
