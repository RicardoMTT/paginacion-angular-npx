import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    // return this.http
    //   .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    //   .pipe(
    //     map((item) =>
    //       item.map(
    //         (item: Todo) =>
    //           new Todo(item.userId, item.id, item.title, item.completed)
    //       )
    //     )
    //   );
  }
}
