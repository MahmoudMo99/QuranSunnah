import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConvertDateAndTimeService {
  convertToArabicNumbers(numberString: string): string {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return numberString.replace(
      /\d/g,
      (digit) => arabicNumbers[parseInt(digit, 10)]
    );
  }

  convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'م' : 'ص';
    const convertedHours = hours % 12 || 12;
    const arabicHours = this.convertToArabicNumbers(convertedHours.toString());
    const arabicMinutes = this.convertToArabicNumbers(minutes.toString());
    return `${arabicHours}:${
      Number(minutes) < 10 ? '٠' + arabicMinutes : arabicMinutes
    } ${period}`;
  }
}
