import { v4 as uuidv4 } from "uuid";

export class UploadedFile {
  private _id: string;
  private _name: string;
  private _size: number;
  private _type: string;
  private _url?: string;
  private _file: File;

  static batchSize: number = 0;

  constructor(file: File) {
    this._id = uuidv4();
    this._file = file;
    this._name = this._file.name;
    this._size = this._file.size;
    this._type = this._file.type;

    this._type = this._type.split("/").slice(-1)[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this._url = event.target.result;
    };
  }

  get id() {
    return this._id;
  }

  get file() {
    return this._file;
  }

  get name() {
    return this._name;
  }

  get size() {
    return this._size;
  }

  get type() {
    return this._type;
  }

  get url() {
    return this._url;
  }

  static increaseBatchSize(size: number): void {
    this.batchSize += size;
  }

  static updateBatchSize(fileSize: number): void {
    this.batchSize -= fileSize;
  }

  static clearBatchSize(): void {
    this.batchSize = 0;
  }
}
