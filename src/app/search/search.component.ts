import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  loading: boolean = true;
  filterValue: string = '';
  subscription: Subscription = new Subscription();
  
  constructor(private _service: SharedService) {
     this.subscription = this._service.filter.subscribe((data: string) => {
      this.filterValue = data;
      
      // this._service.dummyAPI().subscribe((data: any) => {
      //   this.loading = false;
      // });
      
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  }

  ngOnInit(): void {
  }
}
