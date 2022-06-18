import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
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
  price_ranges: string[] = ["Até 50€", "50€ - 150€", "150€ - 300€", "300€ - 600€", "Acima de 600€"];
  range = null;
  price_sort: any[] = [{text: 'Relevância', value: 'relevance'}, {text: 'Mais barato', value: 'low'}, {text: 'Mais caro', value: 'high'}]; 
  sort: any = this.price_sort[0].value;
  
  sellers: FormGroup;
  categories: FormGroup;
  priceRange: FormGroup;

  all_products: product[] = [];
  all_categories: {name: string, icon: string}[];
  all_marketplaces: string[] = ["Custo Justo", "eBay", "OLX", "Kuantokusta", "Bom e Barato"];
  products: product[] = [];

  constructor(private _service: SharedService, private _formBuilder: FormBuilder) {
    this.sellers = _formBuilder.group({
      custojusto : false,
      ebay : false,
      olx : false,
      bomebarato : false
    });

    this.categories = _formBuilder.group({
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

    this.priceRange = _formBuilder.group({ min: '', max: '' }, {validator: minValidator});
    
    this.subscriptionF = this._service.filter.subscribe((data: any) => {
      this.loading = true;
      console.log(data);  // Debug
      this.filterValue = data.filter;
      this.locationValue = data.location;

      this._service.getProducts(this.filterValue, this.locationValue).subscribe((data: any) => {
        this.loading = false;
        this.all_products = data;
        this.products = Object.create(this.all_products);
        console.log(data);
        
        /* Get the Category chosen from the Homepage */
        this.subscriptionC = this._service.category.subscribe((c: string) => {
          if (c !== '') {
            this.categories.get(c.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))?.setValue(true);
            this._service.setCategory('');
            this.products = this.products.filter((p: product) => p.category == c);
          }
        });
      });
      
      // setTimeout(() => {
      //   console.log(data);  // Debug
      //   this.filterValue = data.filter;
      //   this.locationValue = data.location;
      //   this.loading = false;
        
      //   /* Get all products from the Query */
      //   this.all_products = this._service.getProducts(this.filterValue, this.locationValue);
      //   this.products = Object.create(this.all_products);

      //   /* Get the Category chosen from the Homepage */
      //   this.subscriptionC = this._service.category.subscribe((c: string) => {
      //     if (c !== '') {
      //       this.categories.get(c.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))?.setValue(true);
      //       this._service.setCategory('');
      //       this.products = this.products.filter((p: product) => p.category == c);
      //     }
      //   });
      // }, 500);
    });

    this.all_categories = this._service.getCategories();
  }

  ngOnInit(): void {
    this.categories.valueChanges.subscribe(_ => {
      this.refreshFilters();
    });

    this.sellers.valueChanges.subscribe(_ => {
      this.refreshFilters();
    })

    this.priceRange.valueChanges.subscribe(_ => {
      if (this.priceRange.valid) this.refreshFilters();
    });
  };

  // Sorting the data by selected order (price, relevance, etc)
  sortData() {
    this.products = this.products.sort((a: product, b: product) => {
      if (this.sort == 'low') {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      } else if (this.sort == 'high') {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
      } else {
        return Math.round(Math.random() * (1 - (-1)) + (-1));
      }
    });
  }

  // Select a price range
  checkState(event: Event, el: any) {
    event.preventDefault();
    if (this.range && this.range === el.value) {
      el.checked = false;
      this.range = null;
    } else {
      this.range = el.value
      el.checked = true;
    }

    this.refreshFilters();
  }

  /* Shorthands for form controls (used from within template) */
  get min() { return this.priceRange.get('min') };
  get max() { return this.priceRange.get('max') };

   /* Update validation when the phone input changes */
   onPriceInput() {
    if (this.priceRange.hasError('priceWrong')) {
      this.min?.setErrors([{'priceWrong': true}]);
      this.max?.setErrors([{'priceWrong': true}]);
    } else {
      this.min?.setErrors(null);
      this.max?.setErrors(null);
    }
  }

  refreshFilters() {
    // Filter product by category
    let products_c: any[] = [];
    let c_false = true;
    this.all_categories.forEach((c: any) => {
      if (this.categories.get(c.name.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))?.value) {
        c_false = false;
        products_c = products_c.concat(this.all_products.filter((p: product) => p.category == c.name));
      }
    });
    if (c_false) products_c = Object.create(this.all_products);

    // Filter product by seller
    let products_m: any[] = [];
    let m_false: boolean = true;
    this.all_marketplaces.forEach((m: string) => {
      if (this.sellers.get(m.toLocaleLowerCase().replace(/\s/g, ''))?.value) {
        m_false = false;
        products_m = products_m.concat(this.all_products.filter((p: product) => p.marketplace == m));
      }
    });
    if (m_false) products_m = Object.create(this.all_products);

    // Filter product by price (not fully working)
    let products_p: any[] = [];
    if (Number(this.max?.value) == 0)
      products_p = this.all_products.filter((p: product) => p.price >= Number(this.min?.value));
    else
      products_p = this.all_products.filter((p: product) => p.price >= Number(this.min?.value) && p.price <= Number(this.max?.value));

    // Filter product by range
    let products_r: any[] = [];
    if (this.range == 'Até 50€')
      products_r = this.all_products.filter((p: product) => p.price <= 50);
    else if (this.range == '50€ - 150€')
      products_r = this.all_products.filter((p: product) => p.price >= 50 && p.price <= 150);
    else if (this.range == '150€ - 300€')
      products_r = this.all_products.filter((p: product) => p.price >= 150 && p.price <= 300);
    else if (this.range == '300€ - 600€')
      products_r = this.all_products.filter((p: product) => p.price >= 300 && p.price <= 600);
    else if (this.range == 'Acima de 600€')
      products_r = this.all_products.filter((p: product) => p.price >= 600);
    else
      products_r = this.all_products;

    this.products = products_c.filter(value => products_m.includes(value));
    this.products = products_r.filter(value => this.products.includes(value));
    this.products = products_p.filter(value => this.products.includes(value));
    this.sortData();
  }

  ngOnDestroy() {
    this.subscriptionF.unsubscribe();
    this.subscriptionC.unsubscribe();
  }

  getProductFromType(type: string) {
    if (type == 'second') {
      return this.products.filter((p: product) => p.marketplace == "Custo Justo" || p.marketplace == "eBay" || p.marketplace == "OLX" || p.marketplace ==  "Bom e Barato");
    } else {
      return this.products.filter((p: product) => p.marketplace == "Kuantokusta");
    }
  }
}

export const minValidator: ValidatorFn = (formGroup: AbstractControl ): ValidationErrors | null  => {
  var min: string = formGroup.get('min')?.value.replace(/\s/g, "");
  var max: string = formGroup.get('max')?.value.replace(/\s/g, "");

  // If min and max are numbers
  if (!isNaN(Number(min)) && !isNaN(Number(max))) {
    // If min or max are negative
    if (Number(min) < 0 || Number(max) < 0) return { priceWrong: true };

    if (Number(min) == 0 && Number(max) < 0) return { priceWrong: true }; 
    
    if (Number(max) == 0) {
      if (Number(min) < 0) return { priceWrong: true };
      return null;
    }

    // If min is greater than max
    if (Number(min) > Number(max))
      return { priceWrong: true };
    else
      return null;
  } else {
    return { priceWrong: true };
  }
}
