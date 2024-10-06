import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { IGetAllSurahAyat } from 'src/app/models/iapiresponse';
import { QuranService } from 'src/app/services/quran.service';

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

  constructor(
    private route: ActivatedRoute,
    private quranService: QuranService,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this.getSurahId();
  }

  getSurahId() {
    this.surahId = this.route.snapshot.params['id'];
    this.loadSurah();
  }
  loadSurah(): void {
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
    for (let i = 0; i < this.surahData.ayahs.length; i += this.itemsPerPage) {
      this.paginatedSurah.push(
        this.surahData.ayahs.slice(i, i + this.itemsPerPage)
      );
    }
  }
}
