export interface IAPIResponse<T> {
  message: string;
  data: T;
  succeeded: boolean;
  statusCode: number;
  meta: any;
  errors: { [key: string]: string[] };
}

export interface IGetSurahResponse {
  surahs: IGettAllSurahs[];
}

export interface IGettAllSurahs {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: IAyahsInfo[];
}

export interface IAyahsInfo {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}
