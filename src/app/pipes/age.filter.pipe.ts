import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ageFilter'
})
export class ageFilterPipe implements PipeTransform {
  transform(players: any[], age: number): any[] {
    if (!players || !age) {
      return players;
    }
    return players.filter(player => player.age === age);
  }
}