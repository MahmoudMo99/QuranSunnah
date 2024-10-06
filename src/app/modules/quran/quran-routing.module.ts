import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuranTextComponent } from './quran-text/quran-text.component';
import { QuranAudioComponent } from './quran-audio/quran-audio.component';
import { TafseerComponent } from './tafseer/tafseer.component';
import { SurahComponent } from './surah/surah.component';

const routes: Routes = [
  { path: '', component: QuranTextComponent },
  { path: 'audio', component: QuranAudioComponent },
  { path: 'tafseer', component: TafseerComponent },
  { path: 'surah/:id', component: SurahComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuranRoutingModule {}
