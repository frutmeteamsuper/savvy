import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitproductsComponent } from './fruitproducts.component';

describe('FruitproductsComponent', () => {
  let component: FruitproductsComponent;
  let fixture: ComponentFixture<FruitproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
