import { Component, Input } from '@angular/core';
import { Itafseer } from 'src/app/models/itafseer';
import { QuranService } from 'src/app/services/quran.service';

@Component({
  selector: 'app-tafseer',
  templateUrl: './tafseer.component.html',
  styleUrls: ['./tafseer.component.css'],
})
export class TafseerComponent {
  @Input() ayahId!: number;
  tafsir: Itafseer | null = null;
  selectedTafsir: string = '';
  loading = false;
  error = '';

  constructor(private quranService: QuranService) {}

  loadTafsir() {
    this.loading = true;
    this.error = '';
    this.quranService.getTafsir(this.ayahId, this.selectedTafsir).subscribe(
      (response) => {
        console.log(response);

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
    this.selectedTafsir = 'ar.jalalayn';
  }
}
