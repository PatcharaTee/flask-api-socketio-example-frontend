import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

import { FormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { CreateRoomComponent } from './create-room/create-room.component';

const host = "http://127.0.0.1:8000";
const config: SocketIoConfig = { url: host, options: {} };

@NgModule({
  declarations: [AppComponent, RegisterComponent, CreateRoomComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
