import { Component, OnInit } from "@angular/core";
import { SocketIoService } from "./socket-io.service";
import { ApiService } from "./api.service";
import { MatDialog } from "@angular/material/dialog";
import { RegisterComponent } from "./register/register.component";
import { CreateRoomComponent } from "./create-room/create-room.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  id?: number;
  username?: string | any;
  password?: string | any;
  token?: string | null;
  msgList: Array<any> = [];
  roomList: Array<any> = [];
  roomId = -1;
  loggedIn = false;
  selectedRoom = false;
  msg = "";

  mock_roomList = [
    {
      id: 1,
      owner_id: 1,
      name: "test_room_1",
      locked: false,
    },
    {
      id: 2,
      owner_id: 2,
      name: "test_room_2",
      locked: false,
    },
  ];

  mock_msgList = [
    {
      name: "test1",
      sender_id: 1,
      msg: "Hello 1",
      timestamp: 1646405697619,
    },
    {
      name: "test2",
      sender_id: 2,
      msg: "Hello 2",
      timestamp: 1646405697619,
    },
    {
      name: "test3",
      sender_id: 3,
      msg: "Hello 3",
      timestamp: 1646405697619,
    },
    {
      name: "test2",
      sender_id: 2,
      msg: "Hello 2",
      timestamp: 1646405697619,
    },
    {
      name: "test1",
      sender_id: 1,
      msg: "Hello 1",
      timestamp: 1646405697619,
    },
  ];

  constructor(
    private socket: SocketIoService,
    private dialog: MatDialog,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem("token");
    if (typeof this.token != "string") {
      this.token = null;
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
      this.getRoomList();
    }
    console.log("Local store token:", this.token);
  }

  public getRoomList(): void {
    console.log("get room list");
    if (this.token) {
      this.api.getRoomList(this.token).subscribe((response) => {
        if (response["status"] == 200 && response["rooms"].length > 0) {
          this.roomList = response["rooms"];
        }
      });
    }
  }

  public joinRoom(room_id: number): void {
    console.log("Join room " + room_id);
    this.roomId = room_id;
    this.selectedRoom = true;
    this.socket.joinRoom(this.roomId, this.username);
    this.socket.onNewMessage(this.msgList);
  }

  public leaveRoom(): void {
    console.log("Leave room " + this.roomId);
    this.socket.offNewMessage();
    this.socket.leaveRoom(this.roomId, this.username);
    this.selectedRoom = false;
    this.roomId = -1;
    this.msgList = [];
    this.getRoomList();
  }

  public closeRoom(room_id: number): void {
    console.log("Close room id:" + room_id);
  }

  public createRoom(): void {
    console.log("create room");
    const dialogRef = this.dialog.open(CreateRoomComponent, {
      width: "250px",
      data: { name: "", locked: false, password: "" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Create room dialog was closed", result);
      if (result["name"] != "") {
        var name = result["name"];
        var locked = result["locked"];
        var password = result["password"];
        this.api
          .createRoom(name, locked, password, this.token as string)
          .subscribe((response) => {
            if (response["status"] == 200) {
              this.getRoomList();
            }
          });
      }
    });
  }

  public sendMessage(msg: string): void {
    console.log("Send message");
    this.socket.sendMessage(this.roomId, this.username, this.id as number, msg);
  }

  public register(): void {
    console.log("register");
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: "250px",
      data: { username: "", password: "" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Register dialog was closed", result);
      if (result["username"] != "" && result["password"] != "") {
        var username = result["username"];
        var password = result["password"];
        this.api.register(username, password).subscribe((response) => {
          if (response["status"] == 200) {
            this.login(username, password);
          }
        });
      }
    });
  }

  public login(username: string, password: string): void {
    console.log("login");
    this.api.login(username, password).subscribe((response) => {
      if (response["status"] == 200) {
        this.id = response["id"];
        this.username = username;
        this.token = response["access_token"] as string;
        this.loggedIn = true;
        this.socket.onRoom(this.msgList);
        this.getRoomList();
        localStorage.setItem("token", this.token);
      }
    });
  }

  public logout(): void {
    this.api.logout(this.token as string).subscribe((response) => {
      if (response["status"] == 200) {
        this.token = null;
        this.loggedIn = false;
        this.selectedRoom = false;
        this.socket.offRoom();
        localStorage.removeItem("token");
      }
    });
  }
}
