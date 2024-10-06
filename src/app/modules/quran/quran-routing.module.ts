import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuranTextComponent } from './quran-text/quran-text.component';
import { QuranAudioComponent } from './quran-audio/quran-audio.component';
import { TafseerComponent } from './tafseer/tafseer.component';

const routes: Routes = [
  { path: '', component: QuranTextComponent }, // المسار الافتراضي
  { path: 'audio', component: QuranAudioComponent }, // مسار التلاوات
  { path: 'tafseer', component: TafseerComponent }, // مسار التفسير
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuranRoutingModule {}
