import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TradingDashboardComponent } from './trading-dashboard..component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TradingDashboardComponent
      ],
    }).compileComponents();
  });

  it('should create trading dashboard', () => {
    const fixture = TestBed.createComponent(TradingDashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
