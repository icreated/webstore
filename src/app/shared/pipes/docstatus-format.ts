/**
 * Created by spok on 22/07/16.
 */
import {Pipe, PipeTransform} from '@angular/core';
/**
 * Created by spok on 10/06/16.
 */


@Pipe({
  name: 'docStatus'
})
export class DocStatusFormat implements PipeTransform {
  transform(value:any) {
    if (value) {
      if (value === 'CO') {
        return 'Achevé';
      } else if (value === 'CL') {
        return 'Clôturé';
      } else if (value === 'VO') {
        return 'Annulé';
      } else {
        return 'En cours';
      }
    }
    return 'En cours';
  }
}
