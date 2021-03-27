import { Injectable, EventEmitter } from '@angular/core';
import { PositionList, YtdData } from './data.constants';

@Injectable()
export class DataService {
  orderbookData = new EventEmitter();
  bboPriceData = new EventEmitter();
  tradeData = new EventEmitter();

  constructor() {}

  async subscribeAndRquOrderBookData(): Promise<any> {
    this.publishOrderBookData();
    const dataList = [];
    for (let i = 0; i < 100; i++) {
      dataList.push(this.getOrderBookData());
    }
    return dataList;
  }

  private publishOrderBookData(): void {
    setInterval(() => {
      this.orderbookData.emit(this.getOrderBookData());
    }, 500);
  }

  private getOrderBookData(): object {
    return {
      side: this.ramdomZeroOrOne(),
      price: this.getRandomArbitrary(54000, 56000),
      amount: this.getRandomArbitrary(0, 2)
    };
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

  async subscribeTradeData(): Promise<any> {
    this.publishTradeData();
    const dataList = [];
    for (let i = 0; i < 100; i++) {
      dataList.push(this.getTradeData());
    }
    return dataList;
  }

  private publishTradeData(): void {
    setInterval(() => {
      this.bboPriceData.emit(this.getTradeData());
    }, 300);
  }

  private getTradeData(): object {
    return {
      side: this.ramdomZeroOrOne(),
        amount: this.getRandomArbitrary(0, 2),
        price: this.getRandomArbitrary(54000, 56000),
        time: new Date().toTimeString().split(' ')[0]
    };
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
