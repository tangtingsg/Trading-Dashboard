import { Component, OnInit } from '@angular/core';
import { DataService } from '../helper/data.service';
import { CurrencyList } from './data';

@Component({
  selector: 'app-trading-dashboard',
  templateUrl: './trading-dashboard.html',
  styleUrls: ['./trading-dashboard.css'],
  providers: [ DataService ],

})
export class TradingDashboardComponent implements OnInit {
  currencyList = CurrencyList;
  positionMap = new Map<string, any>();
  positionInfo = null;

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initPositionMap();
  }

  private initPositionMap(): void {
    const positionList = this.dataService.getPosotionList();
    const positionMap = new Map<string, any>();
    for (const position of positionList) {
      positionMap.set(position.symbol, position);
    }
    this.positionMap = positionMap;
    this.positionInfo = this.positionMap.get('BTC');
    console.log(this)
  }

}
