import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitbannerComponent } from './fruitbanner.component';

describe('FruitbannerComponent', () => {
  let component: FruitbannerComponent;
  let fixture: ComponentFixture<FruitbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
