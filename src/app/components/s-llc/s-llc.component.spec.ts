import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SLlcComponent } from './s-llc.component';

describe('SLlcComponent', () => {
  let component: SLlcComponent;
  let fixture: ComponentFixture<SLlcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SLlcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SLlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
