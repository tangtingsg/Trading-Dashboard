import { Injectable, EventEmitter } from '@angular/core';
import { PositionList } from './data.constants';

@Injectable()
export class DataService {
  orderbookData = new EventEmitter();
  currentPriceData = new EventEmitter();

  constructor() {
    this.generateOrderBookData();
    this.generateCurrentPriceData();
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

  private generateCurrentPriceData(): void {
    setInterval(() => {
      this.currentPriceData.emit({
        side: this.ramdomZeroOrOne(),
        price: this.getRandomArbitrary(54000, 56000),
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


}
