import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  filterValue: string = '';

  constructor(private _router: Router, private _service: SharedService) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this._service.setFilter(this.filterValue);

    /* Route to the search page */
    if (this.filterValue.length > 0) {
      this._router.navigate(['/search']);
    }

    /* Route to the home page */
    if (this.filterValue.length == 0) {
      this._router.navigate(['/']);
    }
  }
}
