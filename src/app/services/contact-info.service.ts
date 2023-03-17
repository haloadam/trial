import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  private url = 'https://jsonplaceholder.typicode.com/users';
  //uncomment this line to test error functionality.
  /* private url = 'https://jsonplaceholder.typicode.com/users1'; */

  constructor(private http: HttpClient) { }

  public getSampleData(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }
}
