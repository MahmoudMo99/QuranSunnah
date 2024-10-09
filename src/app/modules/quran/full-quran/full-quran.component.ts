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
      .getFullQuran() // استدعاء الدالة الصحيحة
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res.code === 200 && res.status === 'OK') {
          this.fullQuranData = res.data.surahs; // تعيين البيانات بشكل صحيح
          console.log(this.fullQuranData); // للتأكد من أن البيانات تم جلبها بشكل صحيح
        } else {
          console.error('Failed to fetch surahs:', res.status); // التعامل مع الأخطاء
        }
      });
  }
}
