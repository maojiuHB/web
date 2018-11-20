import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    const valueKeys = Object.keys(value);
    for (let i = 0; i < valueKeys.length; i++) {
      const key = valueKeys[i];
      keys.push({ key, value: value[key] });
    }
    return keys;
  }
}
