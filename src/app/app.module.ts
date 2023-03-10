import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxFilesizeModule } from "ngx-filesize";

import { AppComponent } from "./app.component";
import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FileComponent } from "./components/file/file.component";

@NgModule({
  declarations: [AppComponent, UploadFileComponent, FileComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgxFilesizeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
