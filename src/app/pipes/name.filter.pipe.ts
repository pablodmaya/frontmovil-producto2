import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'nameFilter'
})
export class nameFilterPipe implements PipeTransform {
  transform(players: any[], name: string): any[] {
    if (!players || !name ) {
      return players;
    }
    name = name.trim(); // Quita los espacios en blanco al principio y al final
    return players.filter(player => player.name.toLowerCase().includes(name.toLowerCase()) || player.surname.toLowerCase().includes(name.toLowerCase()));
  } 
}