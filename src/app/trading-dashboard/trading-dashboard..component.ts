import { Component, OnInit } from '@angular/core';
import { CurrencyList } from './data';

@Component({
  selector: 'app-trading-dashboard',
  templateUrl: './trading-dashboard.html',
  styleUrls: ['./trading-dashboard.css']
})
export class TradingDashboardComponent implements OnInit {
  currencyList = CurrencyList;

  constructor() {}

  ngOnInit(): void {

  }
}
