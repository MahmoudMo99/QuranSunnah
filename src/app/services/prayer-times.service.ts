import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IAPIResponse } from '../models/iapiresponse';
import { IPrayerTimes } from '../models/iprayer-times';

@Injectable({
  providedIn: 'root',
})
export class PrayerTimesService {
  constructor(private http: HttpClient) {}

  getPrayerTimes(
    city: string,
    country: string = 'egypt',
    date: string
  ): Observable<IAPIResponse<IPrayerTimes>> {
    return this.http.get<IAPIResponse<IPrayerTimes>>(
      `${environment.prayTimes}/${date}`,
      {
        params: { country, city },
      }
    );
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
