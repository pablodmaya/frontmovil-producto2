import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'positionFilter'
})
export class positionFilterPipe implements PipeTransform {
  transform(players: any[], position: string): any[] {
    if (!players || !position) {
      return players;
    }
    return players.filter(player => player.position === position);
  }
}
