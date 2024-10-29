import { Component, DestroyRef, OnInit } from '@angular/core';
import { PrayerTimesService } from 'src/app/services/prayer-times.service';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICities } from 'src/app/models/icities';
import { IPrayerTimes } from 'src/app/models/iprayer-times';
import { ConvertDateAndTimeService } from 'src/app/services/convert-date-and-time.service';

@Component({
  selector: 'app-prayer-times',
  templateUrl: './prayer-times.component.html',
  styleUrls: ['./prayer-times.component.css'],
})
export class PrayerTimesComponent implements OnInit {
  cities: ICities[] = [];
  selectedCity: string = 'qena';
  prayerTimes: IPrayerTimes | null = null;

  constructor(
    private prayerTimesService: PrayerTimesService,
    private http: HttpClient,
    private destroyRef: DestroyRef,
    private convertDateAndTimeService: ConvertDateAndTimeService
  ) {}

  ngOnInit(): void {
    this.loadCities();
    this.fetchPrayerTimes();
  }

  loadCities(): void {
    this.http
      .get('assets/cities.json')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        this.cities = data;
      });
  }

  fetchPrayerTimes(): void {
    const date = this.prayerTimesService.getCurrentDate();
    this.prayerTimesService
      .getPrayerTimes(this.selectedCity, 'egypt', date)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.prayerTimes = data.data;
      });
  }

  onCityChange(): void {
    this.fetchPrayerTimes();
  }

  getFormattedTime(time: string): string {
    return this.convertDateAndTimeService.convertTo12HourFormat(time);
  }

  getArabicNumber(numberString: string): string {
    return this.convertDateAndTimeService.convertToArabicNumbers(numberString);
  }
}
