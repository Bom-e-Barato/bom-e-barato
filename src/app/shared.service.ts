import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /* Initialize the cart_details information */
  private filterSource = new BehaviorSubject<any>(localStorage.getItem('filter') ? localStorage.getItem('filter') : '');
  filter = this.filterSource.asObservable();
  
  constructor() { }

  /* Change the filter value */
  setFilter(filter: string) {
    this.filterSource.next(filter);
    localStorage.setItem('filter', filter);
  }
}
