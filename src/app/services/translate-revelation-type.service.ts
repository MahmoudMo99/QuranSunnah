import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateRevelationTypeService {
  constructor() {}

  translateRevelationType(type: string): string {
    switch (type) {
      case 'Meccan':
        return 'مكية';
      case 'Medinan':
        return 'مدنية';
      default:
        return type;
    }
  }
}
