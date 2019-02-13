import {Component, OnInit} from '@angular/core';
import {CharactersService} from '../characters.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {dirtifyAllFields, handleFile} from '../utils';

function avatarValidator(group: FormGroup) {
  const has_avatar = group.get('has_avatar').value;
  const file = group.get('file').value;

  if (has_avatar && !file) {
    return {avatarRequired: 'Установите аватар'};
  }

  return null;
}

@Component({
  selector: 'sonic-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  characterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    age: new FormControl('', [Validators.required, Validators.min(2), Validators.max(1000)]),
    description: new FormControl(''),
    avatar: new FormGroup({
      has_avatar: new FormControl(false),
      file: new FormControl(undefined)
    }, {validators: [avatarValidator]}),
    skills: new FormArray([new FormControl('', [Validators.required])])
  });

  current$ = this.charactersService.current$;

  constructor(private charactersService: CharactersService) {
  }

  get avatar() {
    return this.characterForm.get('avatar') as FormGroup;
  }

  get skills() {
    return this.characterForm.get('skills') as FormArray;
  }

  ngOnInit() {
    this.current$
      .subscribe(character => this.initializeFormWithCharacter(character));
  }

  onSubmit() {
    dirtifyAllFields(this.characterForm);
    if (this.characterForm.invalid) {
      return;
    }

    const current = this.current$.getValue();
    if (current) {
      this.charactersService.update(this.characterForm.value);
    } else {
      this.charactersService.create(this.characterForm.value);
    }
    this.resetForm();
    console.log(this.characterForm.value);
  }

  async onFileSelect(event) {
    const file = await handleFile(event);
    this.characterForm.get('avatar.file').setValue(file);
  }

  addSkill(name = '') {
    this.skills.push(new FormControl(name, [Validators.required]));
  }

  removeSkill(i: number = 0) {
    this.skills.removeAt(i);
  }

  resetForm() {
    this.characterForm.reset();
    while (this.skills.controls.length > 0) {
      this.removeSkill();
    }
    this.characterForm.markAsPristine();
  }

  initializeFormWithCharacter(character) {
    this.resetForm();
    if (!character) {
      return;
    }
    this.characterForm.setControl('skils', new FormArray([]));
    character.skills.map(s => this.addSkill(s));
    this.characterForm.patchValue(character);
  }
}
