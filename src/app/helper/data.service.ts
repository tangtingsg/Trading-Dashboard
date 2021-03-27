import { Injectable, EventEmitter } from '@angular/core';
import { PositionList, YtdData } from './data.constants';

@Injectable()
export class DataService {
  orderbookData = new EventEmitter();
  bboPriceData = new EventEmitter();
  tradeData = new EventEmitter();
  chartData = new EventEmitter();

  chartInterval: any;
  orderbookInterval: any;
  bboInterval: any;
  tradeInterval: any;

  async subscribeAndReqChartData(): Promise<any> {
    let date = '2008-03-01';
    const dataList = [];
    for (let i = 0; i < 300; i++) {
      date = this.getDate(date);
      dataList.push(this.getChartData(date));
    }
    this.publishChartData(date);
    return dataList;
  }

  private publishChartData(date: string): void {
    this.chartInterval = setInterval(() => {
      date = this.getDate(date);
      if (!date) {
        clearInterval(this.chartInterval);
        this.chartInterval = null;
        return;
      }
      this.chartData.emit(this.getChartData(date));
    }, 2000);
  }

  clearChartInterval(): void {
    clearInterval(this.chartInterval);
    this.chartInterval = null;
  }

  private getDate(date: string): string {
    const day = new Date(date);
    const nextDay = new Date(date);
    nextDay.setDate(day.getDate() + 1);
    if (nextDay > new Date()) {
      return '';
    }
    return `${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}`;
  }

  private getChartData(date: string): object {
    return {
      time: date,
      open: this.getRandomArbitrary(100, 200),
      high: this.getRandomArbitrary(150, 250),
      low: this.getRandomArbitrary(50, 200),
      close: this.getRandomArbitrary(100, 200),
    };
  }

  async subscribeAndRquOrderBookData(): Promise<any> {
    const dataList = [];
    for (let i = 0; i < 100; i++) {
      dataList.push(this.getOrderBookData());
    }
    this.publishOrderBookData();
    return dataList;
  }

  private publishOrderBookData(): void {
    this.orderbookInterval = setInterval(() => {
      this.orderbookData.emit(this.getOrderBookData());
    }, 500);
  }

  clearOrderbookInterval(): void {
    clearInterval(this.orderbookInterval);
    this.orderbookInterval = null;
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
    this.bboInterval = setInterval(() => {
      this.bboPriceData.emit({
        symbol: 'BTC',
        side: this.ramdomZeroOrOne(),
        price: this.getRandomArbitrary(54000, 56000),
      });
    }, 1000);
  }

  clearBboInterval(): void {
    clearInterval(this.bboInterval);
    this.bboInterval = null;
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
    this.tradeInterval = setInterval(() => {
      this.bboPriceData.emit(this.getTradeData());
    }, 800);
  }

  clearTradeInterval(): void {
    clearInterval(this.tradeInterval);
    this.tradeInterval = null;
  }

  private getTradeData(): object {
    return {
      side: this.ramdomZeroOrOne(),
      amount: this.getRandomArbitrary(0, 2),
      price: this.getRandomArbitrary(54000, 56000),
      time: this.generateTime()
    };
  }

  private generateTime(): string {
    return new Date().toTimeString().split(' ')[0];
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
