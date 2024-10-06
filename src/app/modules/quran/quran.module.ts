import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuranRoutingModule } from './quran-routing.module';
import { QuranTextComponent } from './quran-text/quran-text.component';
import { QuranAudioComponent } from './quran-audio/quran-audio.component';
import { TafseerComponent } from './tafseer/tafseer.component';

@NgModule({
  declarations: [QuranTextComponent, QuranAudioComponent, TafseerComponent],
  imports: [CommonModule, QuranRoutingModule],
})
export class QuranModule {}
