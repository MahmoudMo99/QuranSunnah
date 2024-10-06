import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranAudioComponent } from './quran-audio.component';

describe('QuranAudioComponent', () => {
  let component: QuranAudioComponent;
  let fixture: ComponentFixture<QuranAudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuranAudioComponent]
    });
    fixture = TestBed.createComponent(QuranAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
