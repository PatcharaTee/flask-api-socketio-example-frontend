import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SocketIoService {
  constructor(private socket: Socket) {
    console.log("Connect socket");
  }

  public joinRoom(room_id: number, username: string) {
    console.log("join room");
    this.socket.emit("join_room", {
      room_id: room_id,
      username: username,
    });
  }

  public leaveRoom(room_id: number, username: string) {
    console.log("leave room");
    this.socket.emit("leave_room", {
      room_id: room_id,
      username: username,
    });
  }

  public sendMessage(
    room_id: number,
    name: string,
    sender_id: number,
    message: string
  ) {
    this.socket.emit("send_message", {
      room_id: room_id,
      name: name,
      sender_id: sender_id,
      message: message,
    });
  }

  public onNewMessage(msgList: Array<any>) {
    this.socket.on("new_message", function (data: any) {
      msgList.push(data);
    });
  }

  public offNewMessage() {
    this.socket.removeListener("new_message");
  }

  public onRoom(msgList: Array<any>) {
    this.socket.on("room", function (data: any) {
      var newData = {
        name: "Alert",
        sender_id: 0,
        msg: data["msg"],
        timestamp: 0,
      };
      msgList.push(newData);
    });
  }

  public offRoom() {
    this.socket.removeListener("room");
  }
}
