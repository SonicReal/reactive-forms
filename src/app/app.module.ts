import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {CharactersService} from './characters.service';
import {CharactersListComponent} from './characters-list/characters-list.component';
import { CreateCharacterComponent } from './create-character/create-character.component';


@NgModule({
  declarations: [
    AppComponent,
    CharactersListComponent,
    CreateCharacterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [CharactersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
