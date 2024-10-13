import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  IAyahsInfo,
  IGetFullQuranResponse,
  IGetFullQuranSurahs,
} from 'src/app/models/iapiresponse';
import { QuranService } from 'src/app/services/quran.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-full-quran',
  templateUrl: './full-quran.component.html',
  styleUrls: ['./full-quran.component.css'],
})
export class FullQuranComponent implements OnInit, AfterViewInit {
  fullQuranData: IGetFullQuranSurahs[] = [];
  paginatedAyahs: any[] = [];

  bismillah: string = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

  constructor(
    private quranService: QuranService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.loadFullQuran();
  }

  ngAfterViewInit(): void {
    this.setupScrollButton();
  }

  loadFullQuran() {
    this.quranService
      .getFullQuran()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (res) => {
          this.fullQuranData = res.data.surahs;
          this.fullQuranData.forEach((surah) => {
            if (
              surah.ayahs.length > 0 &&
              surah.ayahs[0].text.startsWith(this.bismillah)
            ) {
              surah.ayahs[0].text = surah.ayahs[0].text
                .replace(this.bismillah, '')
                .trim();
            }
          });
          this.splitAyahsByPage();
        },
        (error) => {
          console.error('Error fetching full Quran data', error);
        }
      );
  }

  // الدالة
  //splitAyahsByPage
  // تقوم بتقسيم الآيات المسترجعة من بيانات القرآن (fullQuranData)
  // إلى صفحات،

  //بحيث يتم تخزين كل صفحة والآيات التي تحتويها.
  // يتم أيضًا تقسيم السور بحيث يكون لكل سورة صفحات تحتوي على آياتها.

  // في النهاية
  // يتم تخزين كل هذه البيانات في مصفوفة
  //paginatedAyahs لتسهيل عرضها لاحقًا.

  splitAyahsByPage(): void {
    if (this.fullQuranData.length > 0) {
      // هنا يتم التكرار على كل سورة موجودة في بيانات
      //fullQuranData.
      // كل سورة تحتوي على عدة آيات (ayahs).
      this.fullQuranData.forEach((surah) => {
        let currentPage = surah.ayahs[0].page; // الصفحة الحالية
        let currentPageAyahs: IAyahsInfo[] = []; // الايات الموجودة فى الصفحة الحالية
        let pages: { pageNumber: number; ayahs: IAyahsInfo[] }[] = []; // مصفوفة لتخزين كل صفحات السورة.
        // يتم التكرار على كل آية موجودة في السورة.
        surah.ayahs.forEach((ayah) => {
          // هنا يتم التحقق من ما إذا كانت الآية الحالية تنتمي إلى صفحة جديدة
          //(أي أن رقم الصفحة ayah.page ليس هو نفس currentPage).

          if (ayah.page !== currentPage) {
            // إضافة الآيات إلى الصفحات
            pages.push({
              pageNumber: currentPage,
              ayahs: currentPageAyahs,
            });
            // بدء صفحة جديدة
            currentPage = ayah.page;
            currentPageAyahs = [];
          }
          // إضافة الآية الحالية إلى الصفحة الحالية
          currentPageAyahs.push(ayah);
        });

        // إضافة آخر مجموعة من الآيات بعد انتهاء التكرار
        if (currentPageAyahs.length > 0) {
          pages.push({
            pageNumber: currentPage,
            ayahs: currentPageAyahs,
          });
        }

        // إضافة السورة والصفحات إلى paginatedAyahs
        this.paginatedAyahs.push({
          surah: surah,
          pages: pages,
        });
      });
    } else {
      console.error('Full Quran data is not available.');
    }
  }

  setupScrollButton() {
    let btn = document.getElementById('to-top');
    window.onscroll = function () {
      if (window.scrollY >= 1200) {
        if (btn) {
          btn.style.display = 'block';
        }
      } else {
        if (btn) {
          btn.style.display = 'none';
        }
      }
    };
  }
  scrollToTop() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }
}
