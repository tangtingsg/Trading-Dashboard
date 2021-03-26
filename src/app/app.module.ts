import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { TradingDashboardComponent } from './trading-dashboard/trading-dashboard..component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';

@NgModule({
  declarations: [
    TradingDashboardComponent,
    ChartWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [TradingDashboardComponent]
})
export class AppModule { }
