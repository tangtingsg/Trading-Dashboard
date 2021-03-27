import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { TradingDashboardComponent } from './trading-dashboard/trading-dashboard..component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { OrderWidgetComponent } from './order-widget/order-widget.component';

@NgModule({
  declarations: [
    TradingDashboardComponent,
    ChartWidgetComponent,
    OrderWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [TradingDashboardComponent]
})
export class AppModule { }
