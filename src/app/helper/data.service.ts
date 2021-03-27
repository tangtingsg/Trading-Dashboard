import { Injectable, EventEmitter } from '@angular/core';
import { PositionList, YtdData } from './data.constants';

@Injectable()
export class DataService {
  orderbookData = new EventEmitter();
  bboPriceData = new EventEmitter();
  tradeData = new EventEmitter();

  constructor() {}

  subscribeOrderBookData(): void {
    this.generateOrderBookData();
  }

  private generateOrderBookData(): void {
    setInterval(() => {
      this.orderbookData.emit({
        side: this.ramdomZeroOrOne(),
        price: this.getRandomArbitrary(54000, 56000),
        amount: this.getRandomArbitrary(0, 2)
      });
    }, 500);
  }

  subscribeBboPriceData(): void {
    this.generateBboPriceData();
  }

  private generateBboPriceData(): void {
    setInterval(() => {
      this.bboPriceData.emit({
        symbol: 'BTC',
        side: this.ramdomZeroOrOne(),
        price: this.getRandomArbitrary(54000, 56000),
      });
    }, 300);
  }

  subscribeTradeData(): void {
    this.generateTradeData();
  }

  private generateTradeData(): void {
    setInterval(() => {
      this.bboPriceData.emit({
        side: this.ramdomZeroOrOne(),
        amount: this.getRandomArbitrary(0, 2),
        price: this.getRandomArbitrary(54000, 56000),
        time: new Date().toTimeString().split(' ')[0]
      });
    }, 300);
  }

  private getRandomArbitrary(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(6);
  }

  private ramdomZeroOrOne(): number {
    return Math.round(Math.random());
  }

  getPosotionList(): Array<any> {
    return PositionList;
  }

  getYtdData(symbol: string): any {
    return YtdData.find(data => data.symbol === symbol);
  }

}
