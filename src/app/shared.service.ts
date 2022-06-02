import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  marketplace: string;
  name: string;
  price: number;
  link: string;
  img: string;
  description: string;
  promoted: boolean;
  negotiable: boolean;
  id_seller?: number;
  category?: string[];
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /* Initialize the cart_details information */
  private filterSource = new BehaviorSubject<any>(localStorage.getItem('filter') ? localStorage.getItem('filter') : '');
  filter = this.filterSource.asObservable();

  readonly API = 'http://127.0.0.1:8000/exercise/api';

  constructor(private _http: HttpClient) { }

  /* Change the filter value */
  setFilter(filter: string) {
    this.filterSource.next(filter);
    localStorage.setItem('filter', filter);
  }

  dummyAPI() {
    return this._http.get(this.API + '/exercises');
  }

  /* Get products */
  getProducts() {
    var products : Product[] = [
      {
        marketplace: "OLX",
        name: "Asus ROG Strix RTX 3060 Ti V2 8GB GDDR6",
        price:775,
        link:"https://www.google.com",
        img:"nvidia-card.jpg",
        description:"Motor Gráfico: NVIDIA® GeForce® RTX 3060 Ti\n Bus: PCI Express 4.0 16x \nClore Clock: Base: 1410 MHz, Boost: 1890 MHz\n Clock de Memória: 14 Gbps\n Núcleos CUDA: 4864\n Memória: 8GB GDDR6 \nInterface de Memória: 256 Bits\n Interface 1/0: 3 x DisplayPort 1.4 2 x HDMI 2.1 Suporte HDCP 2.3\n Versão DirectX: 12 \nVersão OpenGL: 4.6 \nDimensões do produto: 31.85 x 14.01 x 5.78 cm",
        promoted:false,
        negotiable:false,
        category:["Placas de Gráficas", "Componentes Informática", "Informática"],
        location:"Aveiro"
      },
    ];
    return products;
  }

}
