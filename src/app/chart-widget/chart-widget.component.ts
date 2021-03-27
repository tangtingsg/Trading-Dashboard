import { Component, OnDestroy, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { DataService } from '../helper/data.service';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.html',
  styleUrls: ['./chart-widget.css'],
  providers: [ DataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWidgetComponent implements OnDestroy, AfterViewInit {
  @ViewChild('chartWidget') chartWidget: ElementRef|null = null;
  @Input() symbol: any;
  lineSeries: any = null;
  dataArray: Array<any> = [];

  constructor(
    private dataService: DataService
  ) {}

  ngOnDestroy(): void {
    this.dataService.clearChartInterval();
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.subscribeData();
  }

  private initChart(): void {
    const nativeElement = this.chartWidget && this.chartWidget.nativeElement;
    if (!nativeElement) {
      return;
    }
    const chart = createChart(nativeElement, {
      height: 250,
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
  }

  private async subscribeData(): Promise<any> {
    this.dataArray = await this.dataService.subscribeAndReqChartData();
    this.lineSeries.setData(this.dataArray);
    this.dataService.chartData.subscribe(data => {
      this.dataArray.push(data);
      this.lineSeries.setData(this.dataArray);
    });
  }
}
