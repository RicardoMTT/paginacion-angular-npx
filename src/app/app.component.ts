import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo';
import { ReqresService } from './services/reqres.service';
import { ReqRes } from './models/reqres';
import { LoginService } from './services/login.service';
import { PhotoService } from './services/photo.service';
import { Photo } from './models/photo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //Sin librrias
  total_pages;
  page;
  data;
  //----
  todos$;
  total: number;
  photos$: Observable<Photo[]>;
  ultimatePage: number;
  reqres$: Observable<ReqRes>;
  per_page: number;
  p: number = 1;
  loginForm: FormGroup;
  constructor(
    private todoService: TodoService,
    private reqResService: ReqresService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private photoService: PhotoService,
    public modal: NgbModal
  ) {
    this.todos$ = new Observable<Todo[]>();
    this.reqres$ = new Observable<ReqRes>();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.reqres$ = this.reqResService.getReqRes(1);
    this.todos$ = this.todoService.getTodos();
    this.photos$ = this.photoService.getPhotos();
    this.getDataForTable();
  }
  change(event) {
    this.p = event;
    this.reqres$ = this.reqResService.getReqRes(event);
  }
  login() {
    const { email, password } = this.loginForm.value;
    this.loginService
      .loginReqRes(email, password)
      .subscribe((jwt) => console.log('jwt', jwt));
  }

  getDataForTable(pageToGet: number = 1) {
    this.reqResService.getReqRes(pageToGet).subscribe((resp: ReqRes) => {
      console.log(resp);

      this.page = resp.page;
      this.per_page = resp.per_page;
      this.ultimatePage = resp.total / resp.per_page;
      this.total_pages = resp.total_pages;
      this.data = resp.data;
    });
  }

  nextPage() {
    if (this.page >= this.total_pages) {
      throw 'Error: reached last page';
    }
    this.getDataForTable(this.page + 1);
  }
  beforePage() {
    console.log(this.page);
    if (this.page == 1) {
      throw 'Error: reached first page';
    }
    this.getDataForTable(this.page - 1);
  }

  firstPage() {
    this.getDataForTable(1);
  }

  lastPage() {
    this.getDataForTable(this.ultimatePage);
  }
}
