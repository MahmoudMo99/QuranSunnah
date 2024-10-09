import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IAyahsInfo, IGetAllSurahAyat } from 'src/app/models/iapiresponse';
import { QuranService } from 'src/app/services/quran.service';
import { TranslateRevelationTypeService } from 'src/app/services/translate-revelation-type.service';

@Component({
  selector: 'app-surah',
  templateUrl: './surah.component.html',
  styleUrls: ['./surah.component.css'],
})
export class SurahComponent implements OnInit {
  surahId!: number;
  surahData!: IGetAllSurahAyat;
  bismillah: string = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
  itemsPerPage: number = 10;
  paginatedSurah: any[] = [];
  totalSurahs: number = 114; // العدد الإجمالي للسور في القرآن

  constructor(
    private route: ActivatedRoute,
    private quranService: QuranService,
    private destroyRef: DestroyRef,
    public translationService: TranslateRevelationTypeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getSurahId();
    this.scroll();
  }

  getSurahId() {
    this.route.paramMap.subscribe((params) => {
      this.surahId = +params.get('id')!;
      this.loadSurah();
    });
  }
  loadSurah(): void {
    this.surahData = {
      number: 0,
      name: '',
      englishName: '',
      englishNameTranslation: '',
      numberOfAyahs: 0,
      revelationType: '',
      ayahs: [],
    };
    this.paginatedSurah = [];
    this.quranService
      .getSurahAyat(this.surahId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (res) => {
          this.surahData = res.data;
          if (this.surahData.ayahs[0].text.startsWith(this.bismillah)) {
            this.surahData.ayahs[0].text = this.surahData.ayahs[0].text
              .replace(this.bismillah, '')
              .trim();
          }
          this.paginateAyahs();
        },
        (error) => {
          console.error('Error fetching surah data', error);
        }
      );
  }

  paginateAyahs(): void {
    let currentPage = this.surahData.ayahs[0].page; // الصفحة الأولى التي تبدأ بها السورة
    let currentPageAyahs: IAyahsInfo[] = [];

    this.surahData.ayahs.forEach((ayah) => {
      if (ayah.page !== currentPage) {
        // إضافة الآيات التي تتبع نفس الصفحة إلى الـ paginatedSurah
        this.paginatedSurah.push({
          pageNumber: currentPage,
          ayahs: currentPageAyahs,
        });
        // بدء صفحة جديدة
        currentPage = ayah.page;
        currentPageAyahs = [];
      }
      // إضافة الآية الحالية إلى صفحة الحالية
      currentPageAyahs.push(ayah);
    });

    // إضافة آخر مجموعة من الآيات بعد انتهاء التكرار
    if (currentPageAyahs.length > 0) {
      this.paginatedSurah.push({
        pageNumber: currentPage,
        ayahs: currentPageAyahs,
      });
    }
  }

  translateRevelationType(type: string) {
    const revelationTypeArabic =
      this.translationService.translateRevelationType(type);
  }
  goToPreviousSurah() {
    const previousSurahNumber = this.surahData.number - 1;
    if (previousSurahNumber >= 1) {
      this.router.navigate(['/quran/surah', previousSurahNumber]);
    }
  }

  goToNextSurah() {
    const nextSurahNumber = this.surahData.number + 1;
    if (nextSurahNumber <= this.totalSurahs) {
      this.router.navigate(['/quran/surah', nextSurahNumber]);
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
