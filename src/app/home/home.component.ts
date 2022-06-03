import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // categories: {name: string, icon: string}[];
  categories: any[];

  products = [
    {
      title: 'Product 1',
      price: '100 €'
    },
    {
      title: 'Product 2',
      price: '200 €'
    },
    {
      title: 'Product 3',
      price: '300 €'
    },
    {
      title: 'Product 4',
      price: '400 €'
    },
    {
      title: 'Product 5',
      price: '500 €'
    },
    {
      title: 'Product 6',
      price: '600 €'
    }
  ];

  constructor(private _service: SharedService) {
    this.categories = this._service.getCategories();
  }

  ngOnInit(): void {
  }
}
