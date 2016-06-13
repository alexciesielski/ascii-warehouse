import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrency implements PipeTransform {

  transform(value: any, args?: any): any {
    let amount = (value / 100).toFixed(2);
    let currency = '$';
    if (args) {
      currency = args;
    }

    return currency + amount;
  }

}
