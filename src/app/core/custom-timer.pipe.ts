import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTimer'
})
export class CustomTimerPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
