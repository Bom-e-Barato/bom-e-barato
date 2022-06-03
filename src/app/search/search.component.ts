import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup} from '@angular/forms';
import { product, SharedService } from '../shared.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  loading: boolean = true;
  filterValue: string = '';
  locationValue: string = '';
  subscriptionF: Subscription = new Subscription();
  subscriptionC: Subscription = new Subscription();
  
  chosen_price_range!: string;
  price_ranges = ["Até 50", "50-150", "150-300", "300-600", "Acima de 600"];
  
  sellers: FormGroup;
  categories: FormGroup;
  all_products: product[] = [];
  products: product[] = [];

  constructor(private _service: SharedService, fb:FormBuilder) {
    this.sellers = fb.group({
      custojusto : false,
      ebay : false,
      olx : false,
      kuantokusta : false
    });

    this.categories = fb.group({
      automoveis : false,
      ferramentas: false,
      roupa: false,
      imoveis: false,
      eletrodomesticos: false,
      desporto: false,
      tecnologia: false,
      lazer: false,
      moveis: false,
      outros: false
    });
    
    this.subscriptionF = this._service.filter.subscribe((data: any) => {
      this.loading = true;
      // this._service.dummyAPI().subscribe((data: any) => {
      //   this.loading = false;
      // });
      
      setTimeout(() => {
        console.log(data);  // Debug
        this.filterValue = data.filter;
        this.locationValue = data.location;
        this.loading = false;
        
        /* Get all products from the Query */
        this.all_products = this._service.getProducts(this.filterValue, this.locationValue);
        this.products = Object.create(this.all_products);
        console.log(this.products);

        /* Get the Category chosen from the Homepage */
        this.subscriptionC = this._service.category.subscribe((c: string) => {
          if (c !== '') {
            this.categories.get(c.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))?.setValue(true);
            this._service.setCategory('');
            this.products = this.products.filter((p: product) => p.category == c);
          }
        });
      }, 500);
    });
  }

  ngOnInit(): void {  
  }

  ngOnDestroy() {
    this.subscriptionF.unsubscribe();
    this.subscriptionC.unsubscribe();
  }
  
  filter() {
    console.log(this.chosen_price_range);
    console.log(this.sellers.value); 
  }
}
