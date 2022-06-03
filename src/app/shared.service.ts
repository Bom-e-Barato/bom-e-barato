import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface product {
  marketplace: string;
  name: string;
  price: number;
  link: string;
  img: string;
  description: string;
  promoted: boolean;
  negotiable: boolean;
  id_seller?: number;
  category?: string;
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /* Initialize the filter information */
  private filterSource = new BehaviorSubject<any>(localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!) : {filter: '', location: ''});
  filter = this.filterSource.asObservable();

  /* Initialize the category information */
  private categorySource = new BehaviorSubject<string>(localStorage.getItem('category') ? localStorage.getItem('category')! : '');
  category = this.categorySource.asObservable();

  readonly API = 'http://127.0.0.1:8000/exercise/api';

  products : product[] = [
    {
      marketplace: "OLX",
      name: "Asus ROG Strix RTX 3060 Ti V2 8GB GDDR6",
      price: 775,
      link: "https://www.google.com",
      img: "nvidia-card.jpg",
      description: "",
      promoted: false,
      negotiable: false
    },
    {
      marketplace: "OLX",
      name: "Zotac RTX 3060 Ti 8GB GDDR6",
      price: 650,
      link: "htts://www.google.com",
      img: "nvidia-card.jpg",
      description: "",
      promoted: false,
      negotiable: false
    },
    {
      marketplace: "Bom e Barato",
      name: "MSI RTX 3060 Ti 8GB GDDR6",
      price: 800,
      link: "",
      img: "nvidia-card.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      promoted: false,
      negotiable: false,
      category: 'Tecnologia',
      location: 'Aveiro'
    },
    {
      marketplace: "Bom e Barato",
      name: "MSI RTX 3060 6GB",
      price: 580,
      link: "",
      img: "nvidia-card.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      promoted: false,
      negotiable: true,
      category: 'Tecnologia',
      location: 'Braga'
    },
    {
      marketplace: "Bom e Barato",
      name: "AMD RX6900 XT",
      price: 700,
      link: "",
      img: "nvidia-card.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      promoted: true,
      negotiable: false,
      category: 'Tecnologia',
      location: 'Bragança'
    },
    {
      marketplace: "Bom e Barato",
      name: "Bola 2022",
      price: 25,
      link: "",
      img: "nvidia-card.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      promoted: false,
      negotiable: true,
      category: "Desporto",
      location: "Aveiro"
    },
    {
      marketplace: "Bom e Barato",
      name: "Futebol bola 2020",
      price: 18,
      link: "",
      img: "nvidia-card.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      promoted: true,
      negotiable: true,
      category: "Desporto",
      location: "Leiria"
    }
  ];

  constructor(private _http: HttpClient) { }

  /* Change the filter value */
  setFilter(filter: string, location: string) {
    if (this.filterSource.value.filter !== filter) {
      if (this.filterSource.value.location !== location) {
        this.filterSource.next({filter: filter, location: location});
        localStorage.setItem('filter', JSON.stringify({filter: filter, location: location}));
      } else {
        this.filterSource.next({filter: filter, location: this.filterSource.value.location});
        localStorage.setItem('filter', JSON.stringify({filter: filter, location: this.filterSource.value.location}));
      }
    } else {
      if (this.filterSource.value.location !== location && this.filterSource.value.filter.length > 0) {
        this.filterSource.next({filter: this.filterSource.value.filter, location: location});
        localStorage.setItem('filter', JSON.stringify({filter: this.filterSource.value.filter, location: location}));
      }
    }
  }

  /* Change the category value */
  setCategory(category: string) {
    this.categorySource.next(category);
    localStorage.setItem('category', category);
  }

  dummyAPI() {
    return this._http.get(this.API + '/exercises');
  }

  getCategories() {
    return [{ name: 'Automóveis', icon: 'directions_car' }, { name: 'Ferramentas', icon: 'construction' },
            { name: 'Roupa', icon: 'checkroom' }, { name: 'Imóveis', icon: 'home' },
            { name: 'Eletrodomésticos', icon: 'microwave_gen' }, { name: 'Desporto', icon: 'sports_soccer' },
            { name: 'Tecnologia', icon: 'devices' }, { name: 'Lazer', icon: 'sports_esports'},
            { name: 'Móveis', icon: 'bed' }, { name: 'Outros', icon: 'handshake' }
          ];
  }

  /* Get all the products */
  getPromotedProducts() {
    return this.products.filter((p: product) => p.promoted == true);
  }

  getProducts(filter: string, location: string) {
    return this.products.filter((product: product) => product.name.toLowerCase().includes(filter.toLowerCase()));
  }
}
