import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // مسار الصفحة الرئيسية
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // المسار الافتراضي
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
  { path: '**', redirectTo: '/home' }, // مسار الأخطاء
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
