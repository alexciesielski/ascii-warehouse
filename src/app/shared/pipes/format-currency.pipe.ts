import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrency implements PipeTransform {

  /**
   * Transforms a number in cents into its corresponding dollar number 
   * (or any other currency passed as an argument) e.g. $4.09
   */
  transform(value: any, args?: any): any {
    let amount = (value / 100).toFixed(2);
    let currency = '$';
    if (args) {
      currency = args;
    }

    return currency + amount;
  }

}
