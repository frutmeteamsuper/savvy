import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruittopbarComponent } from './fruittopbar.component';

describe('FruittopbarComponent', () => {
  let component: FruittopbarComponent;
  let fixture: ComponentFixture<FruittopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruittopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruittopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
