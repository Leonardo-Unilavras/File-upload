import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
})
export class FileComponent implements OnInit {
  @Input() file: any;
  @Output() removeFile: EventEmitter<any> = new EventEmitter();

  regExpEspecialChars: RegExp;
  regExpRemoveExtension: RegExp;
  filename: string;
  iconsMap: any;

  constructor() {
    this.filename = "";
    this.regExpRemoveExtension = /\.[^/.]+$/;
    this.regExpEspecialChars = /[^a-zA-Z0-9.]+/g;

    this.iconsMap = {
      doc: "../../../assets/doc.svg",
      docx: "../../../assets/docx.svg",
      pdf: "../../../assets/pdf.svg",
      plain: "../../../assets/plain.svg",
    };
  }

  ngOnInit(): void {
    this.filename = this.file.name.replace(this.regExpRemoveExtension, "");
    // this.filename = this.file.name.replace(this.regExpEspecialChars, "");
    this.filename = this.shortenString(this.filename, 28);
  }

  shortenString(str: string, maxLength: number): string {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  }

  searchDocType(fileType: string): string {
    return this.iconsMap[fileType];
  }

  removeFileFromList() {
    this.removeFile.emit();
  }
}
