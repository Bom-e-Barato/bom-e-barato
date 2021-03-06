import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxGalleryComponent, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { product, SharedService } from '../shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SendMessageComponent } from './send-message/send-message.component';

const ELEMENT_DATA: product[] = [
  {id: 0, marketplace: "OLX", name: "Asus ROG Strix RTX 3060 Ti V2 8GB GDDR6", price:749, link:"https://olx.pt", img:"", description:"", promoted:false, negotiable:false, category:"", location:""},  
  {id: 0, marketplace: "CustoJusto", name: "Asus ROG Strix RTX 1070 Ti V2 8GB GDDR5", price:560, link:"https://custojusto.pt", img:"", description:"", promoted:false, negotiable:false, category:"", location:""},
  {id: 0, marketplace: "eBay", name: "Asus ROG Strix RTX 3060 Ti V2 6GB GDDR6", price:500, link:"https://ebay.com", img:"", description:"", promoted:false, negotiable:false, category:"", location:""},
  {id: 0, marketplace: "Amazon", name: "Gigabyte GeForce RTX 3060 Ti VISION OC LHR 8GB GDDR6", price:770, link:"https://amazon.com", img:"", description:"", promoted:false, negotiable:false, category:"", location:""},
];

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  products: product[] = [];
  products2: product[] = [];
  product!: product;
  subscription: Subscription = new Subscription();
  owner: boolean = false;
  loading: boolean = true;
  page:boolean = false;

  displayedColumns: string[] = ["marketplace", "name", "price", "link"];
  dataSource = new MatTableDataSource(this.products2);
  
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('gallery') gallery!: NgxGalleryComponent;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private ref: ChangeDetectorRef,private _liveAnnouncer: LiveAnnouncer, private _service: SharedService, private _snackBar: MatSnackBar, private _router: Router, public dialog : MatDialog) {
    this.subscription = this._service.productOpened.subscribe((data: product) => {
      this.product = data;
      this._service.getProducts(this.product.name,'').subscribe((data: any) => {
        this.selectProducts(data);
        this.dataSource = new MatTableDataSource(this.products2);
        
        this.loading = false;
        ref.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.page = true;
      });
      if (this.product.seller == Number(localStorage.getItem('id'))) this.owner = true;
    });
  }

  ngOnInit(): void {
    this._service.getPromotedProducts().subscribe((data: any) => {
      this.products = data as product[];
      
    });

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'http://localhost:8000' + this.product.img,
        medium: 'http://localhost:8000' + this.product.img,
        big: 'http://localhost:8000' + this.product.img
      },
      {
        small: 'http://localhost:8000' + this.product.img,
        medium: 'http://localhost:8000' + this.product.img,
        big: 'http://localhost:8000' + this.product.img
      },
      {
        small: 'http://localhost:8000' + this.product.img,
        medium: 'http://localhost:8000' + this.product.img,
        big: 'http://localhost:8000' + this.product.img
      },      
      {
        small: 'http://localhost:8000' + this.product.img,
        medium: 'http://localhost:8000' + this.product.img,
        big: 'http://localhost:8000' + this.product.img
      }      
    ];
  }

  ngAfterViewInit() {    
  }

  selectProducts(product: product []) {
    //get 1 product from each marketplace
    var marketplace = ["OLX", "Kuantokusta", "eBay","Custo Justo"];
    for (var i = 0; i < marketplace.length; i++) {
      for (var j = 0; j < product.length; j++) {
        if (product[j].marketplace == marketplace[i]) {
          this.products2.push(product[j]);
          break;
        }
      }
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  redirect(link: any) {
    window.open(link, '_blank');
  }

  deleteAd() {
    this._service.deleteAd(this.product.id).subscribe((data: any) => {
      if (data.v == true) {
        this._service.openProductPage({id: 0, marketplace: '', name: '', price: 0, link: '', img: '', description: '', promoted: false, negotiable: false});
        this._snackBar.open('An??ncio eliminado!', 'Fechar', { "duration": 2500 });
        this._router.navigate(['/home']);
      } else {
        this._snackBar.open('Erro ao eliminar an??ncio!', 'Fechar', { "duration": 2500 });
      }
    });
  }

  openDialog() {
    this.dialog.open(SendMessageComponent, {
      data: {
        id: this.product.seller,
      },
    });
  }
}
