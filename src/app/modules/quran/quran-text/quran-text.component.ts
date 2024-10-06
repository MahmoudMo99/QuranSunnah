import { Component, DestroyRef, OnInit } from '@angular/core';
import { QuranService } from 'src/app/services/quran.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IGettAllSurahs } from 'src/app/models/iapiresponse';

@Component({
  selector: 'app-quran-text',
  templateUrl: './quran-text.component.html',
  styleUrls: ['./quran-text.component.css'],
})
export class QuranTextComponent implements OnInit {
  surahs: IGettAllSurahs[] = [];

  constructor(
    private quranService: QuranService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getAllSurahs();
  }

  getAllSurahs() {
    this.quranService
      .getSurahs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.surahs = res.data.surahs;
      });
  }

  translateRevelationType(type: string): string {
    switch (type) {
      case 'Meccan':
        return 'مكية';
      case 'Medinan':
        return 'مدنية';
      default:
        return type;
    }
  }
}
