import { Component, DestroyRef, OnInit } from '@angular/core';
import {
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
  constructor(
    private quranService: QuranService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.loadFullQuran();
  }

  loadFullQuran() {
    this.quranService
      .getFullQuran()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.fullQuranData = res.data.surahs;
      });
  }
}
