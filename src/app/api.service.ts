import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  //private host = "https://flask-api-socketio-example.herokuapp.com";
  private host = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) {}

  public getRoomList(token: string | null): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .get(this.host + "/room/list", httpOptions)
      .pipe(map((response) => response));
  }

  public createRoom(
    name: string,
    locked: boolean,
    password: string,
    token: string
  ): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .post(
        this.host + "/room/create",
        {
          name: name,
          locked: locked,
          password: password,
        },
        httpOptions
      )
      .pipe(map((response) => response));
  }

  public closeRoom(room_id: number, token: string): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .delete(this.host + "/room/create?room_id=" + room_id, httpOptions)
      .pipe(map((response) => response));
  }

  public register(username: string, password: string): Observable<any> {
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return this.http
      .post(this.host + "/auth/register", formData)
      .pipe(map((response) => response));
  }

  public login(username: string, password: string): Observable<any> {
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return this.http
      .post(this.host + "/auth/login", formData)
      .pipe(map((response) => response));
  }

  public logout(token: string | null): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .post(this.host + "/auth/logout", null, httpOptions)
      .pipe(map((response) => response));
  }
}
