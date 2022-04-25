import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPercent'
})
export class ToPercentPipe implements PipeTransform {

  transform(value: number, ): number {
    const m = (Date.now() - value) / 1000000;
    return 100 - m;
  }

}
