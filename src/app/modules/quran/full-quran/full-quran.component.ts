import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  IAyahsInfo,
  IGetFullQuranResponse,
  IGetFullQuranSurahs,
} from 'src/app/models/iapiresponse';
import { QuranService } from 'src/app/services/quran.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-full-quran',
  templateUrl: './full-quran.component.html',
  styleUrls: ['./full-quran.component.css'],
})
export class FullQuranComponent implements OnInit {
  fullQuranData: IGetFullQuranSurahs[] = [];
  // paginatedAyahs: { pageNumber: number; ayahs: IAyahsInfo[] }[] = [];
  paginatedAyahs: {
    surah: IGetFullQuranSurahs;
    pages: { pageNumber: number; ayahs: IAyahsInfo[] }[];
  }[] = [];

  bismillah: string = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

  constructor(
    private quranService: QuranService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.loadFullQuran();
    this.scroll();
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

  // splitAyahsByPage(): void {
  //   // تأكد من وجود بيانات كاملة للقرآن
  //   if (this.fullQuranData.length > 0) {
  //     // تجميع جميع الآيات في مصفوفة واحدة
  //     const allAyahs: IAyahsInfo[] = this.fullQuranData.flatMap(
  //       (surah) => surah.ayahs
  //     );

  //     let currentPage = allAyahs[0].page; // الصفحة الأولى
  //     let currentPageAyahs: IAyahsInfo[] = [];

  //     allAyahs.forEach((ayah) => {
  //       if (ayah.page !== currentPage) {
  //         // إضافة الآيات إلى paginatedAyahs
  //         this.paginatedAyahs.push({
  //           pageNumber: currentPage,
  //           ayahs: currentPageAyahs,
  //         });
  //         // بدء صفحة جديدة
  //         currentPage = ayah.page;
  //         currentPageAyahs = [];
  //       }
  //       // إضافة الآية الحالية إلى صفحة الحالية
  //       currentPageAyahs.push(ayah);
  //     });

  //     // إضافة آخر مجموعة من الآيات بعد انتهاء التكرار
  //     if (currentPageAyahs.length > 0) {
  //       this.paginatedAyahs.push({
  //         pageNumber: currentPage,
  //         ayahs: currentPageAyahs,
  //       });
  //     }
  //   } else {
  //     console.error('Full Quran data is not available.');
  //   }
  // }

  splitAyahsByPage(): void {
    if (this.fullQuranData.length > 0) {
      // تجميع جميع الآيات في مصفوفة واحدة
      this.fullQuranData.forEach((surah) => {
        let currentPage = surah.ayahs[0].page; // الصفحة الأولى
        let currentPageAyahs: IAyahsInfo[] = [];
        let pages: { pageNumber: number; ayahs: IAyahsInfo[] }[] = [];

        surah.ayahs.forEach((ayah) => {
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

  scroll() {
    let btn = document.getElementById('to-top');
    window.onscroll = function () {
      if (window.scrollY >= 1200) {
        btn!.style.display = 'block';
      } else {
        btn!.style.display = 'none';
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
