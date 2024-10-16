import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAPIResponse,
  IGetAllSurahAyat,
  IGetAllSurahs,
  IGetFullQuranResponse,
} from '../models/iapiresponse';
import { environment } from '../environments/environment';
import { Itafseer } from '../models/itafseer';
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

  getFullQuran(): Observable<IAPIResponse<IGetFullQuranResponse>> {
    return this.http.get<IAPIResponse<IGetFullQuranResponse>>(
      environment.fullQuran
    );
  }

  getTafsir(
    ayahId: number,
    tafsirType: string
  ): Observable<IAPIResponse<Itafseer>> {
    const url = `https://api.alquran.cloud/v1/ayah/${ayahId}/${tafsirType}`;
    return this.http.get<IAPIResponse<Itafseer>>(url);
  }
}
