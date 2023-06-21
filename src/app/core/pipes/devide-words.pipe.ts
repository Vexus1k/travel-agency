import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'devideWords'
})
export class DevideWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const words = value.split(/(?=[A-Z])/);

    return words.join(' ');
  }
}
