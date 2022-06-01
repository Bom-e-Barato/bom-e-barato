import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup} from '@angular/forms';

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
  subscription: Subscription = new Subscription();
  
  //preço
  chosen_price_range!: string;
  price_ranges = ["Até 50", "50-150", "150-300", "300-600", "Acima de 600"];
  
  //vendedores
  sellers : FormGroup;

  constructor(private _service: SharedService, fb:FormBuilder) {
     this.subscription = this._service.filter.subscribe((data: string) => {
      this.filterValue = data;
      
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
  }


}
