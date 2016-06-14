import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTimestamp'
})
export class FormatTimestamp implements PipeTransform {

  /** 
   * Formats an ISO-timestamp (Tue May 31 2016 15:07:06 GMT+0200 (Central European Daylight Time))
   * Outputs 'x days ago' if timestamp is less then 7 days ago
   * or a readable date format if older.  
   */
  transform(value: any, args?: any): string {
    let formatted = moment(value, 'ddd MMMM DD YYYY HH:mm:ss ZZ');

    if (this.isOlderThan7Days(formatted))
      return formatted.format('MMMM Do YYYY'); // May 31st 2016
    else
      return formatted.fromNow(); // 6 days ago
  }

  private isOlderThan7Days(momentTimestamp: moment.Moment) {
    let milisFromNow = moment().diff(momentTimestamp);
    return (milisFromNow / 1000 / 60 / 60 / 24) > 7;
  }
}
