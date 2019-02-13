import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export async function handleFile(event) {
  const files = event.files || event.srcElement.files;
  const result = await new Promise(d => {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry && droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry;
        fileEntry.file((file: File) => {
          d(file);
        });
      } else {
        d(droppedFile);
      }
    }
  });
  return extractFileSrc(result);
}

async function extractFileSrc(file): Promise<{ src: any, name: string, file: any }> {
  const reader = new FileReader();

  return new Promise<any>(d => {
    reader.onload = (e) => d({src: e.target['result'], name: file.name, file: file});
    reader.readAsDataURL(file);
  });
}

export function dirtifyAllFields(control: AbstractControl) {
  control.markAsDirty({onlySelf: true});

  let children: AbstractControl[] = [];
  if (control instanceof FormArray) {
    children = control.controls;
  } else if (control instanceof FormGroup) {
    children = Object.values(control.controls);
  }
  children.forEach(dirtifyAllFields);
}
