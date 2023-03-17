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
  uploadLimit: number;
  hasLimitReached: boolean;

  constructor(public fb: FormBuilder) {
    this.fileForm = this.fb.group({
      inputFile: new FormControl("", [Validators.required]),
    });
    this.uploadedFiles = [];
    this.uploadLimit = 1000000000;
    this.hasLimitReached = false;
  }

  ngOnInit(): void {}

  isValidInput(form: FormGroup, fieldName: string): boolean {
    return (
      (form.get(fieldName) && !form.get(fieldName)?.hasError("required")) ??
      false
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length) {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        if (files[i].type && this.isFileTypeValid(files[i].type)) {
          if (this.batchSize() + files[i].size <= this.uploadLimit) {
            this.uploadedFiles.push(new UploadedFile(files[i]));
            UploadedFile.increaseBatchSize(files[i].size);
          } else {
            this.hasLimitReached = true;
          }
        }
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

    if (this.batchSize() === 0) this.hasLimitReached = false;
  }

  isFileTypeValid(fileType: string): boolean {
    if (fileType) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
        "image/svg+xml",
      ];
      if (allowedTypes.includes(fileType)) {
        return true;
      }
    }
    return false;
  }

  cancel(): void {
    this.clearInput();
    this.uploadedFiles = [];
    UploadedFile.clearBatchSize();
    this.hasLimitReached = false;
  }

  submit() {
    // if (this.fileForm.invalid) return;
    // console.log('Enviou a imagem');
    console.table(this.uploadedFiles);
    console.log(this.uploadedFiles);
  }
}
