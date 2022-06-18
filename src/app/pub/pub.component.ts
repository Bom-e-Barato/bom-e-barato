import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.scss']
})
export class PubComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  redirect() {
    window.open('https://www.vinted.pt/', '_blank');
  }
}
