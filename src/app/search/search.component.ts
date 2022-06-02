import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Product, SharedService } from '../shared.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  loading: boolean = true;
  filterValue: string = '';
  locationValue: string = '';
  subscription: Subscription = new Subscription();
  
  //preço
  chosen_price_range!: string;
  price_ranges = ["Até 50", "50-150", "150-300", "300-600", "Acima de 600"];
  
  //vendedores
  sellers : FormGroup;

  products: Product[] = [];

  constructor(private _service: SharedService, fb:FormBuilder) {
    this.subscription = this._service.filter.subscribe((data: any) => {
      console.log(data);

      this.loading = true;
      this.filterValue = data.filter;
      this.locationValue = data.location;
      
      // this._service.dummyAPI().subscribe((data: any) => {
      //   this.loading = false;
      // });
      
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });

    this.sellers = fb.group({
      custojusto : false,
      ebay : false,
      olx : false,
      amazon : false
    });
  }

  ngOnInit(): void {
    this.products = this._service.getProducts();   
  }
  
  filter() {
    console.log(this.chosen_price_range);
    console.log(this.sellers.value); 
  }
}
