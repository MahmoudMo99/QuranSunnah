import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'quran',
    loadChildren: () =>
      import('./modules/quran/quran.module').then((m) => m.QuranModule),
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./modules/questions-and-info/questions-and-info.module').then(
        (m) => m.QuestionsAndInfoModule
      ),
  },
  {
    path: 'hadith',
    loadChildren: () =>
      import('./modules/hadith/hadith.module').then((m) => m.HadithModule),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./modules/books-and-lectures/books-and-lectures.module').then(
        (m) => m.BooksAndLecturesModule
      ),
  },
  {
    path: 'azkar',
    loadChildren: () =>
      import('./modules/azkar-and-dua/azkar-and-dua.module').then(
        (m) => m.AzkarAndDuaModule
      ),
  },
  { path: '', redirectTo: '/quran', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
