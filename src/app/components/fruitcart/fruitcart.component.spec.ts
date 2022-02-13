import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitcartComponent } from './fruitcart.component';

describe('FruitcartComponent', () => {
  let component: FruitcartComponent;
  let fixture: ComponentFixture<FruitcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
