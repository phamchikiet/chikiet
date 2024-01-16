import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
  standalone: true,
  name: 'begindate',
})
export class BeginDatePipe implements PipeTransform {
  transform(value: any): any {
    return moment(value).startOf('day').toDate()
  }
}
@Pipe({
  standalone: true,
  name: 'enddate',
})
export class EndDatePipe implements PipeTransform {
    transform(value: any): any {
      return moment(value).endOf('day').toDate()
    }
  }
@Pipe({
  standalone: true,
  name: 'changedate',
})
export class ChangedatePipe implements PipeTransform {
    transform(value: any): any {
      return moment(value).format("DD/MM/YYYYTHH:mm:ss")
    }
  }