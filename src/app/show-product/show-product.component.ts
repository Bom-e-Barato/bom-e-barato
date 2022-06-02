import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {NgxGalleryComponent, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Product, SharedService } from '../shared.service';
import {MatPaginator} from '@angular/material/paginator';

const ELEMENT_DATA: Product[] = [
  {marketplace: "OLX", name: "Asus ROG Strix RTX 3060 Ti V2 8GB GDDR6", price:749, link:"https://olx.pt", img:"", description:"", promoted:false, negotiable:false, category:[], location:""},  
  {marketplace: "CustoJusto", name: "Asus ROG Strix RTX 1070 Ti V2 8GB GDDR5", price:560, link:"https://custojusto.pt", img:"", description:"", promoted:false, negotiable:false, category:[], location:""},
  {marketplace: "eBay", name: "Asus ROG Strix RTX 3060 Ti V2 6GB GDDR6", price:500, link:"https://ebay.com", img:"", description:"", promoted:false, negotiable:false, category:[], location:""},
  {marketplace: "Amazon", name: "Gigabyte GeForce RTX 3060 Ti VISION OC LHR 8GB GDDR6", price:770, link:"https://amazon.com", img:"", description:"", promoted:false, negotiable:false, category:[], location:""},
];

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  displayedColumns: string[] = ["marketplace", "name", "price", "link"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('gallery') gallery!: NgxGalleryComponent;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private _liveAnnouncer: LiveAnnouncer, private _service: SharedService) { }

  products: Product[] = [];
  product!: Product;

  ngOnInit(): void {
    this.products = this._service.getProducts();

    // REMOVE THIS AFTER
    this.product = this.products[0];

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
        small: 'http://localhost:4200/assets/img/' + this.product.img,
        medium: 'http://localhost:4200/assets/img/' + this.product.img,
        big: 'http://localhost:4200/assets/img/' + this.product.img
      },
      {
        small: 'http://localhost:4200/assets/img/' + this.product.img,
        medium: 'http://localhost:4200/assets/img/' + this.product.img,
        big: 'http://localhost:4200/assets/img/' + this.product.img
      },
      {
        small: 'http://localhost:4200/assets/img/' + this.product.img,
        medium: 'http://localhost:4200/assets/img/' + this.product.img,
        big: 'http://localhost:4200/assets/img/' + this.product.img
      },      
      {
        small: 'http://localhost:4200/assets/img/' + this.product.img,
        medium: 'http://localhost:4200/assets/img/' + this.product.img,
        big: 'http://localhost:4200/assets/img/' + this.product.img
      }      
    ];
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

}
