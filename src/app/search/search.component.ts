import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  filterValue: string = '';
  subscription: Subscription = new Subscription();
  
  constructor(private _service: SharedService) {
    this.subscription = this._service.filter.subscribe((data: string) => {
      this.filterValue = data;
    });
  }

  ngOnInit(): void {
  }

}
