import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QuranModule } from './modules/quran/quran.module';
import { AzkarAndDuaModule } from './modules/azkar-and-dua/azkar-and-dua.module';
import { BooksAndLecturesModule } from './modules/books-and-lectures/books-and-lectures.module';
import { HadithModule } from './modules/hadith/hadith.module';
import { QuestionsAndInfoModule } from './modules/questions-and-info/questions-and-info.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuranModule,
    AzkarAndDuaModule,
    BooksAndLecturesModule,
    HadithModule,
    QuestionsAndInfoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
