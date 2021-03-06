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

  readonly AD_API = 'http://127.0.0.1:8000/advertisement/api';
  readonly ACCOUNT_API = 'http://127.0.0.1:8000/account/api';
  readonly CONVERSATION_API = 'http://127.0.0.1:8000/conversation/api'

  products : product[] = [
    {
      id: 0,
      marketplace: "OLX",
      name: "Asus ROG Strix RTX 3060 Ti",
      price: 775,
      link: "https://www.google.com",
      img: "nvidia-card.jpg",
      description: "",
      promoted: false,
      negotiable: false,
      seller: 1
    },
    {
      id: 0,
      marketplace: "OLX",
      name: "Zotac RTX 3060 Ti 8GB",
      price: 650,
      link: "htts://www.google.com",
      img: "nvidia-card.jpg",
      description: "",
      promoted: false,
      negotiable: false,
      seller: 1
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "MSI RTX 3060 Ti 8GB",
      price: 800,
      link: "",
      img: "nvidia-card.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      promoted: false,
      negotiable: false,
      category: 'Tecnologia',
      location: 'Aveiro',
      seller: 2
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "MSI RTX 3060 6GB",
      price: 580,
      link: "",
      img: "nvidia-card.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      promoted: false,
      negotiable: true,
      category: 'Tecnologia',
      location: 'Braga',
      seller: 2
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "AMD RX6900 XT",
      price: 700,
      link: "",
      img: "nvidia-card.jpg",
      description: "6GB de mem??ria GDDR6.\nPlaca gr??fica AMD RX6900 XT em otimo estado.",
      promoted: true,
      negotiable: false,
      category: 'Tecnologia',
      location: 'Bragan??a',
      seller: 3
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Bola Mundial 2022",
      price: 25,
      link: "",
      img: "bola.jpg",
      description: "Bola oficial do mundial de futebol do Qatar 2022 em otimo estado",
      promoted: false,
      negotiable: true,
      category: "Desporto",
      location: "Aveiro",
      seller: 4
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Camisola do CR7",
      price: 28,
      link: "",
      img: "cr7.jpg",
      description: "Camisola do maior jogador do mundo,do imcompar??vel Cristiano Ronaldo.",
      promoted: true,
      negotiable: false,
      category: "Desporto",
      location: "Leiria",
      seller: 2
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Chinelos de dedo Havaianas",
      price:20,
      link: "",
      img: "havaiana.jpg",
      description: "Excelentes para passear em dias quentes de ver??o.Muito confortaveis 10/10 ",
      promoted: false,
      negotiable: true,
      category: "Moda",
      location: "Aveiro",
      seller: 5
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Comando Ps4",
      price: 40,
      link: "",
      img: "ps4.jpg",
      description: "Comando do PS4, com acessorios, ??timo para passar a tarde a jogar com a familia",
      promoted: false,
      negotiable: true,
      category: "Tecnologia",
      location: "Braga",
      seller: 6
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Comando Xbox One",
      price: 40,
      link: "",
      img: "xbox.jpg",
      description: "Comando do Xbox, com acessorios, ??timo para passar a tarde a jogar com amigos",
      promoted: true,
      negotiable: false,
      category: "Tecnologia",
      location: "Porto",
      seller: 6
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Conjunto de cama",
      price: 20,
      link: "",
      img: "cama.jpg",
      description: "Jogo de len??ois para a sua cama que ir?? dar um novo ar ao seu quarto",
      promoted: false,
      negotiable: true,
      category: "Moda",
      location: "Aveiro",
      seller: 7
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name:"Mochila Eastpack",
      price: 35,
      link: "",
      img: "mochila.jpg",
      description: "Mochila para levar para a escola ou para o trabalho",
      promoted: false,
      negotiable: false,
      category: "Moda",
      location: "Coimbra",
      seller: 8
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Cadeira Gaming",
      price: 170,
      link: "",
      img: "cadeira.jpg",
      description: "Cadeira para jogar confortavelmente,muito boa,10/10",
      promoted: false,
      negotiable: true,
      category: "Tecnologia",
      location: "Porto",
      seller: 9
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Par de patins",
      price: 40,
      link: "",
      img: "patins.jpg",
      description: "Par de patins para um passeio pela rua da pega ou para fazer truqes no skatepark",
      promoted: false,
      negotiable: false,
      category: "Desporto",
      location: "Aveiro",
      seller: 10
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Tenda",
      price: 50,
      link: "",
      img: "tenda.jpg",
      description: "Tenda perfeita para fazer um retiro na natureza",
      promoted: false,
      negotiable: true,
      category: "Outros",
      location: "Braga",
      seller: 11
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "M??quina de lavar roupa",
      price: 260,
      link: "",
      img: "maquina.jpg",
      description: "Maquina de lavar a roupa em muito bom estado,economica e de facil uso",
      promoted: true,
      negotiable: false,
      category: "Eletrodom??sticos",
      location: "Porto",
      seller: 12
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Berbequim",
      price: 50,
      link: "",
      img: "berbequim.jpg",
      description: "Berbbequim perfeito para fazer todo o tipo de furos",
      promoted: false,
      negotiable: true,
      category: "Ferramentas",
      location: "Guarda",
      seller: 13
    },
    {
      id: 0,
      marketplace: "Bom e Barato",
      name: "Filme do Bruno Aleixo",
      price: 10,
      link: "",
      img: "filme.jpg",
      description: "Filme do Bruno Aleixo,um obra prima do cinema,otimo para ver e rever em qualquer ocasiao",
      promoted: true,
      negotiable: false,
      category: "Lazer",
      location: "Aveiro",
      seller: 14
    },

  ];

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
    return [{ name: 'Autom??veis', icon: 'directions_car' }, { name: 'Ferramentas', icon: 'construction' },
            { name: 'Roupa', icon: 'checkroom' }, { name: 'Im??veis', icon: 'home' },
            { name: 'Eletrodom??sticos', icon: 'microwave_gen' }, { name: 'Desporto', icon: 'sports_soccer' },
            { name: 'Tecnologia', icon: 'devices' }, { name: 'Lazer', icon: 'sports_esports'},
            { name: 'M??veis', icon: 'bed' }, { name: 'Outros', icon: 'handshake' }
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
