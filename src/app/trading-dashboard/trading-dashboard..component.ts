import { Component, OnInit } from '@angular/core';
import { SymbolList } from '../helper/data.constants';

@Component({
  selector: 'app-trading-dashboard',
  templateUrl: './trading-dashboard.html',
  styleUrls: ['./trading-dashboard.css'],
})
export class TradingDashboardComponent implements OnInit {
  symbolList = SymbolList;
  selectedSymbolName = 'BTC';
  selectedSymbol = SymbolList.find(ele => ele.symbol === 'BTC');
  positionMap = new Map<string, any>();
  positionInfo = null;

  ngOnInit(): void {}

  symbolListChange(symbol: any): void {
    this.selectedSymbol = SymbolList.find(ele => ele.symbol === symbol);
    console.log(symbol)
    console.log(this)
  }

}
