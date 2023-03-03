import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { UploadedFile } from "../../models/File.class";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent implements OnInit {
  fileForm!: FormGroup;
  uploadedFiles: UploadedFile[];

  constructor(public fb: FormBuilder) {
    this.fileForm = this.fb.group({
      file: new FormControl("", [Validators.required]),
    });
    this.uploadedFiles = [];
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
        if (this.batchSize() < limit) {
          if (
            files[i].size < limit &&
            files[i].size + this.batchSize() < limit
          ) {
            this.uploadedFiles.push(new UploadedFile(files[i]));
            UploadedFile.increaseBatchSize(files[i].size);
          } else
            alert(`Arquivo ${files[i].name} maior do que o limite de 5 MB!`);
        } else break;
      }

      this.clearInput();
    }
  }

  batchSize(): number {
    return UploadedFile.batchSize;
  }

  clearInput() {
    this.fileForm.reset();
  }

  removeFileFromList(fileId: string): void {
    this.uploadedFiles = this.uploadedFiles.filter((file) => {
      if (file.id === fileId) {
        UploadedFile.updateBatchSize(file.size);
        return;
      }

      return file;
    });
  }

  cancel(): void {
    this.clearInput();
    this.uploadedFiles = [];
    UploadedFile.clearBatchSize();
  }

  submit() {
    // if (this.fileForm.invalid) return;
    // console.log('Enviou a imagem');
    console.table(this.uploadedFiles);
    console.log(this.uploadedFiles);
  }
}
