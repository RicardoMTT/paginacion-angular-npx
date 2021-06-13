import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqRes, User } from '../models/reqres';
@Injectable({
  providedIn: 'root',
})
export class ReqresService {
  constructor(private http: HttpClient) {}

  getReqRes(num): Observable<ReqRes> {
    return this.http.get<ReqRes>(`https://reqres.in/api/users?page=${num}`);
  }
}
