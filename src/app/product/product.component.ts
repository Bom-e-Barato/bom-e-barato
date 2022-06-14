import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() data: any;
  
  isActive1 = false;

  constructor(private _router: Router, private _service: SharedService) { }

  ngOnInit(): void {
  }
  
  /* Open the page with the product details */
  open_product() {
    if (this.data.link != '') {
      window.location.href = this.data.link;
    } else {
      this._service.openProductPage(this.data);
      this._router.navigate(['/product']);
    }
  }

  setName(data: any) {
    if (data.name.length <= 25) {
      return  data.name + '\n\n' ;
    } else if (data.name.length >= 45) {
      return data.name.substring(0, 42) + '...';
    } else {
      return data.name;
    }
  }

  getPrice(data: any) {
    return data.price.toString().replace('.', ',');
  }

  getImage(data: any) {
    if (data.marketplace == 'Bom e Barato') {
      return 'http://localhost:4200/assets/img/' + data.img;
    } else {
      if (Array.from(data.img)[0] == 'h') {
        return data.img;
      } else {
        if (data.marketplace == 'OLX')
          return 'http://localhost:4200/assets/img/olx.png';
        else
          return 'http://localhost:4200/assets/img/custojusto.png';
      }
    }
  }
}
