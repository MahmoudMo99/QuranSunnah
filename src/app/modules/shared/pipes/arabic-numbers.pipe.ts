import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicNumbers',
})
export class ArabicNumbersPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[+digit]);
  }
}
