import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPercent'
})
export class ToPercentPipe implements PipeTransform {

  transform(value: number, ): number {
    const m = (Date.now() - value) / 100000000000;
    // console.log('[INFO]', m);
    return 100 - m;
  }

}
