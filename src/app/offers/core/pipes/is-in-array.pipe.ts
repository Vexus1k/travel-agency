import { Pipe, PipeTransform } from '@angular/core';
import { IOffer } from "../../../core/interfaces";
import { isEqual } from "lodash";

@Pipe({
  name: 'isInArray'
})
export class IsInArrayPipe implements PipeTransform {
  public transform(element: IOffer, array: IOffer[]): boolean {
    return array.some(item => isEqual(item, element));
  }
}
