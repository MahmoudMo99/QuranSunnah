import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAPIResponse,
  IGetAllSurahAyat,
  IGetAllSurahs,
} from '../models/iapiresponse';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class QuranService {
  constructor(private http: HttpClient) {}

  getAllSurahs(): Observable<IAPIResponse<IGetAllSurahs[]>> {
    return this.http.get<IAPIResponse<IGetAllSurahs[]>>(environment.fullSurahs);
  }

  getSurahAyat(surah: number): Observable<IAPIResponse<IGetAllSurahAyat>> {
    return this.http.get<IAPIResponse<IGetAllSurahAyat>>(
      `${environment.domain}/surah/${surah}/quran-uthmani`
    );
  }

  // getSurahs(): Observable<IAPIResponse<IGetSurahResponse>> {
  //   return this.http.get<IAPIResponse<IGetSurahResponse>>(
  //     environment.fullQuran
  //   );
  // }
}
