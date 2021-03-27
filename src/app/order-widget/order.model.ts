export class OrderModel {
  price: number|null = null;
  qty: number|null = null;
  amount: string|null = null;

  timeout: any;
  tips = '';

  onInputChange(): void {
    const amount = this.price && this.qty ?
      +this.price * +this.qty : null;
    this.amount = amount?.toFixed(3) || null;
  }

  placeOrder(side: string): void {
    const data = this.formateData(side);
    if (!data) {
      return;
    }
    this.tips = `Sucessful ${side} ${this.qty} at ${this.price} price`;
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
      this.tips = 'Please input price';
      return null;
    }
    if (!this.qty) {
      this.tips = 'Please input qty';
      return null;
    }
    return {
      side,
      price: this.price,
      qty: this.qty
    };
  }
}

