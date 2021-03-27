import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
  orderbookData = new EventEmitter();

  constructor() {
    this.generateOrderBook();
  }

  private generateOrderBook(): void {
    setInterval(() => {
      this.orderbookData.emit({
        side: this.ramdomZeroOrOne(),
        price: this.getRandomArbitrary(54000, 56000),
        amount: this.getRandomArbitrary(0, 2)
      });
    }, 500);
  }

  private getRandomArbitrary(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(6);
  }

  private ramdomZeroOrOne(): number {
    return Math.round(Math.random());
  }


}
