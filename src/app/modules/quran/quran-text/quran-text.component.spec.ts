import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranTextComponent } from './quran-text.component';

describe('QuranTextComponent', () => {
  let component: QuranTextComponent;
  let fixture: ComponentFixture<QuranTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuranTextComponent]
    });
    fixture = TestBed.createComponent(QuranTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
