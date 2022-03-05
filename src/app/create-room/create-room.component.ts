import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogData {
  name: string;
  locked: boolean;
  password: string;
}

@Component({
  selector: "app-create-room",
  templateUrl: "./create-room.component.html",
  styleUrls: ["./create-room.component.css"],
})
export class CreateRoomComponent implements OnInit {
  name?: string;
  locked: boolean = false;
  password: string = "";

  constructor(
    public dialogRef: MatDialogRef<CreateRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log("Init create-room");
  }
}
