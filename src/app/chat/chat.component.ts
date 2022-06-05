import { Component, OnInit } from '@angular/core';

export interface User {
  name: string;
  message: string;
  date:Date;
}

const ELEMENT_DATA: User[] = [
  {name: 'Edgar', message: 'ola', date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola quero adquirir droga',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},
  {name: 'Edgar', message: 'ola',date:new Date(2018, 0O5, 0O5, 17, 23, 42, 11)},

];

const messages= [{text: 'ola', id: 0}, {text: 'td bem?', id:0}, {text: 'oi como estas', id: 1},{text: 'ola', id: 0}, {text: 'td bem?', id:0}, {text: 'oi como estas', id: 1}];


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  displayedColumns: string[] = ['name','message','date'];
  dataSource = ELEMENT_DATA;
  messages=messages;
  constructor() { }

  ngOnInit(): void {
  }

}
