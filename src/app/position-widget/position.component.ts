import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../helper/data.service';
import { PositionModel } from './position.model';

@Component({
  selector: 'app-position-widget',
  templateUrl: './position-widget.html',
  styleUrls: ['./position-widget.css'],
  providers: [ DataService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionWidgetComponent implements OnInit, OnDestroy {
  positionModels: Array<PositionModel> = [];
  positionModelsMap = new Map<string, PositionModel>();

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef) {
    }

  ngOnInit(): void {
    console.log(this)
    this.initPositions();
    this.dataService.subscribeBboPriceData();
    this.dataService.bboPriceData.subscribe(bbo => {
      const positionModel = this.positionModelsMap.get(bbo.symbol);
      if (positionModel) {
        positionModel.updatePrice(bbo);
        this.cdRef.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.dataService.orderbookData.unsubscribe();
  }

  initPositions(): void {
    const positions = this.dataService.getPosotionList() || [];
    this.positionModels.length = 0;
    this.positionModelsMap.clear();
    for (const positon of positions) {
      const positionModel = new PositionModel(positon);
      this.positionModels.push(positionModel);
      this.positionModelsMap.set(positionModel.symbol, positionModel);
    }
  }

}
