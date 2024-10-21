import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuranTextComponent } from './quran-text/quran-text.component';
import { QuranAudioComponent } from './quran-audio/quran-audio.component';
import { TafseerComponent } from './tafseer/tafseer.component';
import { SurahComponent } from './surah/surah.component';
import { FullQuranComponent } from './full-quran/full-quran.component';

const routes: Routes = [
  // { path: 'quran-surahs', component: QuranTextComponent },
  { path: '', component: QuranTextComponent }, // يظهر عند زيارة /quran
  { path: 'audio', component: QuranAudioComponent },
  { path: 'tafseer', component: TafseerComponent },
  { path: 'surah/:id', component: SurahComponent },
  { path: 'full-quran', component: FullQuranComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuranRoutingModule {}
