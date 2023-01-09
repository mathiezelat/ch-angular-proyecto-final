import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if (value) {
      return 'Sí';
    } else {
      return 'No';
    }
  }

}
