import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  characters$ = new BehaviorSubject([
    {
      name: 'Anonymous',
      age: 25,
      description: 'Загадочный персонаж',
      avatar: {has_avatar: false, file: null},
      skills: ['Загадочность']
    }
  ]);
  current$ = new BehaviorSubject(undefined);

  constructor() {
  }

  create(character) {
    const characters = this.characters$.getValue();
    characters.push({...character});
    this.characters$.next(characters);
    this.setCurrent(undefined);
  }

  setCurrent(character) {
    this.current$.next(character);
  }

  update(character) {

    const current = this.current$.getValue();
    const characters = this.characters$.getValue();
    characters.splice(characters.indexOf(current), 1);
    const updated = {...current, ...character};
    characters.push(updated);

    this.characters$.next(characters);
    this.current$.next(undefined);
  }

}
