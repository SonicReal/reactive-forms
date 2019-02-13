import {Component, OnInit} from '@angular/core';
import {CharactersService} from '../characters.service';

@Component({
  selector: 'sonic-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters$ = this.charactersService.characters$;
  current$ = this.charactersService.current$;

  constructor(private charactersService: CharactersService) {
  }

  ngOnInit() {
  }

  select(character) {
    const current = this.charactersService.current$.getValue();

    this.charactersService.setCurrent(current === character ? undefined : character);
  }
}
