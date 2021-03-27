export class OrderModel {
  price: number|null = null;
  amount: number|null = null;
  total: string|null = null;

  timeout: any;
  tips = '';

  onInputChange(): void {
    const amount = this.price && this.amount ?
      +this.price * +this.amount : null;
    this.total = amount?.toFixed(3) || null;
  }

  placeOrder(side: string): void {
    const data = this.formateData(side);
    if (!data) {
      return;
    }
    this.tips = `Sucessful ${side} ${this.amount} at ${this.price} price`;
    this.timeout = setTimeout(() => {
      this.tips = '';
    }, 6000);
  }

  clearTimeout(): void {
    clearTimeout(this.timeout);
  }

  formateData(side: string): object|null {
    this.tips = '';
    if (!this.price) {
      this.tips = '*Please input price';
      return null;
    }
    if (!this.amount) {
      this.tips = '*Please input amount';
      return null;
    }
    return {
      side,
      price: this.price,
      amount: this.amount
    };
  }
}

