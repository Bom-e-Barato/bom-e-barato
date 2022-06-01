import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /* Initialize the cart_details information */
  private filterSource = new BehaviorSubject<any>(localStorage.getItem('filter') ? localStorage.getItem('filter') : '');
  filter = this.filterSource.asObservable();

  readonly API = 'http://127.0.0.1:8000/exercise/api';

  constructor(private _http: HttpClient) { }

  /* Change the filter value */
  setFilter(filter: string) {
    this.filterSource.next(filter);
    localStorage.setItem('filter', filter);
  }

  dummyAPI() {
    return this._http.get(this.API + '/exercises');
  }
}
