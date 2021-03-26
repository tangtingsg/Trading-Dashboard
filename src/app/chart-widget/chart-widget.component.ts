import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.html',
  styleUrls: ['./chart-widget.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWidgetComponent implements OnInit, OnDestroy {
  lineSeries: any = null;
  dataArray: Array<any> = [];

  interval: any;

  constructor() {}

  ngOnInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  private clearInterval(): void{
    clearInterval(this.interval);
    this.interval = null;
  }

  private initChart(): void {
    const chart = createChart(document.body, {
      width: 600,
      height: 300,
      layout: {
        backgroundColor: '#061121',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });

    this.lineSeries = chart.addCandlestickSeries(
      {
        upColor: 'rgb(2, 192, 118)',
        downColor: 'rgb(248, 73, 96)'
      }
    );

    let date = '2008-03-01';
    this.interval = setInterval(() => {
      date = this.getDate(date);
      if (!date) {
        this.clearInterval();
        return;
      }
      this.updateData(date);
    }, 1000);
  }

  private updateData(date: string): void {
    this.dataArray.push(this.randomData(date));
    this.lineSeries.setData(this.dataArray);
  }

  private randomData(date: string): any {
    return {
      time: date,
      open: this.getRandomArbitrary(100, 200),
      high: this.getRandomArbitrary(150, 250),
      low: this.getRandomArbitrary(50, 200),
      close: this.getRandomArbitrary(100, 200),
    };
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

  private getRandomArbitrary(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(2);
  }
}
