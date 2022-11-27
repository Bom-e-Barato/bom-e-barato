import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface product {
  id: number,
  marketplace: string;
  name: string;
  price: number;
  link: string;
  img: string;
  description: string;
  promoted: boolean;
  negotiable: boolean;
  seller?: number;
  category?: string;
  location?: string;
}

export interface login {
  email: string,
  password: string
}

export interface person {
  email: string,
  first_name: string,
  last_name: string,
  birth_date: string,
  password?: string,
  avatar?: string | null,
}

export interface account_response {
  v: boolean,
  m: string,
  t?: string,
  id?: number
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /* Initialize the log status as true or false*/
  private logStatusSource = new BehaviorSubject<boolean>(localStorage.getItem('loggedIn') === 'true' ? true : false);
  currentLogStatus = this.logStatusSource.asObservable();

  /* Initialize the filter information */
  private filterSource = new BehaviorSubject<any>(localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!) : {filter: '', location: ''});
  filter = this.filterSource.asObservable();

  /* Initialize the category information */
  private categorySource = new BehaviorSubject<string>(localStorage.getItem('category') ? localStorage.getItem('category')! : '');
  category = this.categorySource.asObservable();

  /* Initialize the product information */
  private productSource = new BehaviorSubject<product>(JSON.parse(localStorage.getItem('product-page')!));
  productOpened = this.productSource.asObservable();

   /* Initialize the cart_details information */
   private cartSource = new BehaviorSubject<any>(localStorage.getItem('cart-page') ? JSON.parse('[]') : JSON.parse(localStorage.getItem('cart-page')!));
   cartOpened = this.cartSource.asObservable();

  readonly AD_API = 'http://deti-tqs-01.ua.pt:8000/advertisement/api';
  readonly ACCOUNT_API = 'http://deti-tqs-01.ua.pt:8000/account/api';
  readonly CONVERSATION_API = 'http://deti-tqs-01.ua.pt:8000/conversation/api'

  constructor(private _http: HttpClient) { }

  /* Change log status used across the app*/
  changeLogStatus(logStatus: boolean) {
    this.logStatusSource.next(logStatus);
    localStorage.setItem('loggedIn', logStatus.toString());
  }

  /* Login with email and password */
  login(credentials: login) {
    return this._http.post(this.ACCOUNT_API + '/login', credentials);
  }

  /* Get credentials from authenticated user */
  getCredentials() {
    var token : any = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this._http.get(this.ACCOUNT_API + '/user', httpOptions);
  }

  /* Logout with account response */
  logout() {
    var token: any = localStorage.getItem('token');

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Bearer ' + token
        })
    };

    /* Remove the token from local storage */
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    return this._http.post(this.ACCOUNT_API + '/logout', token, httpOptions);
  }

  /* Register with person attributes */
  register(person: person) {
    return this._http.post(this.ACCOUNT_API + '/register', person);
  }

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
    var token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    }

    return this._http.post(this.AD_API + '/get_promoted_ads', httpOptions);
  }

  getProducts(filter: string, location: string) {
    if (location == null || location == undefined) location = '';

    var handler_args: any = {
      search_term: filter,
      max_pages: 1,
      marketplaces: ['Bom e Barato', 'olx', 'cj', 'ebay', 'kk'],
      location: location.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
    };

    return this._http.post(this.AD_API + '/get_all_ads', handler_args);
  }

  /* Change the opened product page information */
  openProductPage(product: product) {
    this.productSource.next(product);
    localStorage.setItem('product-page', JSON.stringify(product));
  }

  addProduct(ad: any) {
    var token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    }

    return this._http.post(this.AD_API + '/add_advertisement', ad, httpOptions);
  }
  
  uploadProductPhoto(file: FormData, id: Number) {
    var token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    };

    return this._http.post(this.AD_API + '/update_advertisement_img/' + id, file, httpOptions);
  }

  getProductInfo(id: Number) {
    var token = localStorage.getItem('token');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    }
    return this._http.get(this.AD_API + '/get_ad/' + id, httpOptions);
  }
    
  addMessage(receiver_id : number, message : string) {
    console.log("receiver_id");
    console.log(receiver_id);
    
    var token = localStorage.getItem('token');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    }

    return this._http.post(this.CONVERSATION_API + '/add_message/' + receiver_id, {message:message}, httpOptions);
  }

  getConversation(sender_id : number) {
    var token = localStorage.getItem('token');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    }
    
    return this._http.get(this.CONVERSATION_API + '/conversation_with/' + sender_id, httpOptions);
  }

  deleteAd(id: Number) {
    var token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    }

    return this._http.delete(this.AD_API + '/delete_advertisement/' + id, httpOptions);
  }

  getMessages() {
    var token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    }

    return this._http.get(this.CONVERSATION_API + '/get_messages', httpOptions);
  }

  /* Change the opened cart page information */
  openCartPage(cart: any) {
    if (cart == null) {
      this.cartSource.next([]);
      localStorage.setItem('cart-page', JSON.stringify([]));
    } else {
      var new_cart = JSON.parse(localStorage.getItem('cart-page')!) == null ? [] : JSON.parse(localStorage.getItem('cart-page')!);
      console.log(new_cart);

      new_cart.push(cart);

      this.cartSource.next(new_cart);
      localStorage.setItem('cart-page', JSON.stringify(new_cart));
    }
  }
}
