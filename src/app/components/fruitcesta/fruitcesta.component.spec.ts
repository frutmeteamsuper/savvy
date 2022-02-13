import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitcestaComponent } from './fruitcesta.component';

describe('FruitcestaComponent', () => {
  let component: FruitcestaComponent;
  let fixture: ComponentFixture<FruitcestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitcestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitcestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
