import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullQuranComponent } from './full-quran.component';

describe('FullQuranComponent', () => {
  let component: FullQuranComponent;
  let fixture: ComponentFixture<FullQuranComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullQuranComponent]
    });
    fixture = TestBed.createComponent(FullQuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
