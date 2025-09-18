import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastryItem } from './pastry-item';

describe('PastryItem', () => {
  let component: PastryItem;
  let fixture: ComponentFixture<PastryItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastryItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastryItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
