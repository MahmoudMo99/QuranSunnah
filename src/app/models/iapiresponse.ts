export interface IAPIResponse<T> {
  status: string;
  code: number;
  data: T;
}

export interface IGetAllSurahs {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface IGetAllSurahAyat {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: IAyahsInfo[];
}

export interface IGetFullQuranResponse {
  surahs: IGetFullQuranSurahs[];
}

export interface IGetFullQuranSurahs {
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
