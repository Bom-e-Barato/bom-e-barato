import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

export interface Product {
  marketplace: string;
  avaliacao: number;
  nome: string;
  preco: number;
  link: string;
}

const ELEMENT_DATA: Product[] = [
  {marketplace: "OLX", avaliacao:4.1, nome: "Asus ROG Strix RTX 3060 Ti V2 8GB GDDR6", preco:749, link:""},
  {marketplace: "CustoJusto", avaliacao:4.0, nome: "Asus ROG Strix RTX 1070 Ti V2 8GB GDDR5", preco:560, link:""},
  {marketplace: "eBay", avaliacao:3.9, nome: "Asus ROG Strix RTX 3060 Ti V2 6GB GDDR6", preco:500, link:""},
  {marketplace: "Amazon", avaliacao:4.3, nome: "Gigabyte GeForce RTX 3060 Ti VISION OC LHR 8GB GDDR6", preco:770, link:""},
];



@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements AfterViewInit {
  displayedColumns: string[] = ["Marketplace", "Avaliacao", "Nome", "Preco", "Link"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
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
        small: 'http://localhost:4200/assets/img/nvidia-card.jpg',
        medium: 'http://localhost:4200/assets/img/nvidia-card.jpg',
        big: 'http://localhost:4200/assets/img/nvidia-card.jpg'
      },
      {
        small: 'http://localhost:4200/assets/img/nvidia-card.jpg',
        medium: 'http://localhost:4200/assets/img/nvidia-card.jpg',
        big: 'http://localhost:4200/assets/img/nvidia-card.jpg'
      },
      {
        small: 'http://localhost:4200/assets/img/nvidia-card.jpg',
        medium: 'http://localhost:4200/assets/img/nvidia-card.jpg',
        big: 'http://localhost:4200/assets/img/nvidia-card.jpg'
      }
    ];
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
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
