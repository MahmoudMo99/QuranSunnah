import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuranModule } from './modules/quran/quran.module';
import { AzkarAndDuaModule } from './modules/azkar-and-dua/azkar-and-dua.module';
import { BooksAndLecturesModule } from './modules/books-and-lectures/books-and-lectures.module';
import { HadithModule } from './modules/hadith/hadith.module';
import { QuestionsAndInfoModule } from './modules/questions-and-info/questions-and-info.module';
import { MainInterceptor } from './interceptor/main.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ClickOutsideNavDirective } from './directives/click-outside-nav.directive';
import { PrayerTimesComponent } from './components/prayer-times/prayer-times.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ScrollToTopComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    ClickOutsideNavDirective,
    PrayerTimesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QuranModule,
    AzkarAndDuaModule,
    BooksAndLecturesModule,
    HadithModule,
    QuestionsAndInfoModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
