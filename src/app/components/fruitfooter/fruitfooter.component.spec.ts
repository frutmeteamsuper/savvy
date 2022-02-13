import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitfooterComponent } from './fruitfooter.component';

describe('FruitfooterComponent', () => {
  let component: FruitfooterComponent;
  let fixture: ComponentFixture<FruitfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
