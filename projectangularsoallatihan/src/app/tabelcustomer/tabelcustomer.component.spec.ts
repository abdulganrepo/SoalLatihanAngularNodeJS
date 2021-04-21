import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelcustomerComponent } from './tabelcustomer.component';

describe('TabelcustomerComponent', () => {
  let component: TabelcustomerComponent;
  let fixture: ComponentFixture<TabelcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
