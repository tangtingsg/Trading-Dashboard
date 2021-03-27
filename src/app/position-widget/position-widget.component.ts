import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
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
  @Input() positionInfo: any = null;
  positionModel: PositionModel|null = null;

  constructor(
    private dataService: DataService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const positionModel = new PositionModel(this.positionInfo);
    this.positionModel = positionModel;
    this.dataService.subscribeBboPriceData();
    this.dataService.bboPriceData.subscribe(data => {
      positionModel.updateBboPrice(data);
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.dataService.bboPriceData.unsubscribe();
  }
}
