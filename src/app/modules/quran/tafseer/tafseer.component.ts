import { Component, DestroyRef, Input } from '@angular/core';
import { Itafseer } from 'src/app/models/itafseer';
import { QuranService } from 'src/app/services/quran.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IGetAyah } from 'src/app/models/iget-ayah';

@Component({
  selector: 'app-tafseer',
  templateUrl: './tafseer.component.html',
  styleUrls: ['./tafseer.component.css'],
})
export class TafseerComponent {
  @Input() ayahId!: number;
  @Input() ayahText!: string;
  tafsir: Itafseer | null = null;
  ayah: IGetAyah | null = null;
  selectedTafsir: string = '';
  loading = false;
  error = '';

  constructor(
    private quranService: QuranService,
    private destroyRef: DestroyRef
  ) {}

  loadTafsir() {
    this.loading = true;
    this.error = '';
    this.quranService
      .getTafsir(this.ayahId, this.selectedTafsir)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (response) => {
          this.tafsir = response.data;
          this.loading = false;
        },
        (error) => {
          this.error = 'حدث خطأ أثناء جلب التفسير.';
          this.loading = false;
        }
      );
  }

  clearContent() {
    this.tafsir = null;
    this.loading = false;
    this.error = '';
    this.selectedTafsir = '';
  }
}
