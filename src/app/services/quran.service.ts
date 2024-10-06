import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../models/iapiresponse';
import { environment } from '../environments/environment';
import { IGetSurahResponse } from '../models/iapiresponse';
@Injectable({
  providedIn: 'root',
})
export class QuranService {
  constructor(private http: HttpClient) {}
  getSurahs(): Observable<IAPIResponse<IGetSurahResponse>> {
    return this.http.get<IAPIResponse<IGetSurahResponse>>(
      environment.fullQuran
    );
  }
}
