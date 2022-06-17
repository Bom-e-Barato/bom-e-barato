import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { product, SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: {name: string, icon: string}[];
  promoted: product[] = [];
  filterValue!: {filter: string, location: string};
  subscription: Subscription = new Subscription();

  constructor(private _service: SharedService, private _router: Router) {
    this.categories = this._service.getCategories();
    this._service.getPromotedProducts().subscribe((data: any) => {
      this.promoted = data as product[];
      console.log(this.promoted)
    });
  }

  ngOnInit(): void {
  }

  selectCategory(category: string) {
    this._service.setCategory(category);
    this._router.navigate(['/search']);
  }
}
