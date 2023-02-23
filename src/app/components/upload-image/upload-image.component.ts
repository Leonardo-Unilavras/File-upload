import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"],
})
export class UploadImageComponent implements OnInit {
  fileForm!: FormGroup;
  filesList: any[];
  urlsList: any[];
  filesListKeys: any[];

  constructor(public fb: FormBuilder) {
    this.fileForm = this.fb.group({
      file: new FormControl("", [Validators.required]),
    });

    this.filesList = [];
    this.urlsList = [];
    this.filesListKeys = [];
  }

  ngOnInit(): void {}

  isValidInput(form: FormGroup, fieldName: string): boolean {
    return (
      (form.get(fieldName) && !form.get(fieldName)?.hasError("required")) ??
      false
    );
  }

  onFileChange(event: any) {
    const multiplier = 10000000;
    const limit = multiplier * 1024;

    if (event.target.files.length) {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        if (this.bacthSize() < limit) {
          if (
            files[i].size < limit &&
            files[i].size + this.bacthSize() < limit
          ) {
            this.filesList.push(files[i]);
            this.previewImage(files[i]);
          } else
            alert(`Arquivo ${files[i].name} maior do que o limite de 5 MB!`);
        } else break;
      }

      this.filesListKeys = Array.from(this.filesList.keys());
      this.clearInput();
    }
  }

  previewImage(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.urlsList.push(event.target.result);
    };
  }

  bacthSize(): number {
    let batchSize = 0;
    for (let i = 0; i < this.filesList.length; i++) {
      batchSize += this.filesList[i].size;
    }

    return batchSize;
  }

  clearInput() {
    this.fileForm.reset();
  }

  submit() {
    // if (this.fileForm.invalid) return;
    // console.log('Enviou a imagem');
    console.log(this.filesList);
  }
}
