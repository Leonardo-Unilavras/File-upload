import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
})
export class FileComponent implements OnInit {
  @Input() file: any;
  @Output() removeFile: EventEmitter<any> = new EventEmitter();

  regExpFileName: RegExp;
  filename: string;

  constructor() {
    this.filename = "";
    this.regExpFileName = /^([\w-]+?)(?=\.[^.]*$|$)/;
  }

  ngOnInit(): void {
    this.filename = this.file.name.match(this.regExpFileName)[1];
    this.filename = this.shortenString(this.filename, 28);
  }

  shortenString(str: string, maxLength: number): string {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  }

  removeFileFromList() {
    this.removeFile.emit();
  }
}
