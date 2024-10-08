import { Component, DestroyRef, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IGetAllSurahs } from 'src/app/models/iapiresponse';
import { TranslateRevelationTypeService } from 'src/app/services/translate-revelation-type.service';

@Component({
  selector: 'app-quran-text',
  templateUrl: './quran-text.component.html',
  styleUrls: ['./quran-text.component.css'],
})
export class QuranTextComponent implements OnInit {
  surahs: IGetAllSurahs[] = [];

  constructor(
    private quranService: QuranService,
    private destroyRef: DestroyRef,
    public translationService: TranslateRevelationTypeService
  ) {}

  ngOnInit(): void {
    this.getAllSurahs();
  }

  getAllSurahs() {
    this.quranService
      .getAllSurahs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.surahs = res.data;
      });
  }

  translateRevelationType(type: string) {
    const revelationTypeArabic =
      this.translationService.translateRevelationType(type);
  }
}
