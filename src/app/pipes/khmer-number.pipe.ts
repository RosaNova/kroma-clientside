// khmer-number.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'khmerNumber',
  standalone: true  
})
export class KhmerNumberPipe implements PipeTransform {
  private khmerDigits = ['០','១','២','៣','៤','៥','៦','៧','៨','៩'];

  transform(value: number | string): string {
    if (value == null) return '';
    const strValue = value.toString();
    return strValue.replace(/\d/g, (digit) => this.khmerDigits[+digit]);
  }
}
