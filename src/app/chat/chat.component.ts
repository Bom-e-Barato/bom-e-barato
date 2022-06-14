import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

export interface chat {
  id : number;
  sender : string;
  receiver : string;
  message : string;
}

const chat_data : chat[] = [
  {id: 3, sender: "Hugo", receiver: "Ludvico", message: "Olá Ludvico"},
  {id: 2, sender: "Ludvico", receiver: "Hugo", message: "Olé hugo"},
  {id: 4, sender: "Zé", receiver: "Flávia", message: "Texto random"},
  {id: 1, sender: "Hugo", receiver: "Ludvico", message: "Olé Oléééé"},
  {id: 5, sender: "Flávia", receiver: "Zé", message: "mensagem"},
  {id: 7, sender: "Flávia", receiver: "Hugo", message: "Olá"},
  {id: 8, sender: "Zé", receiver: "Ludvico", message: "Hello"},
  {id: 6, sender: "Hugo", receiver: "Zé", message: "Hey"},
]


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  users : string[] = [];
  title : string = "";
  messages_sent : any[] = [];
  messages_received : any[] = [];

  // just for testing purposes
  loggedin_username : string = "";

  constructor(
    private _service : SharedService
  ) { }


  ngOnInit(): void {
    this._service.getCredentials().subscribe((data:any) => {
      if(data.v == true) {
        this.loggedin_username = data.info.first_name;
        this.users = ["Hugo", "Ludvico", "Zé", "Flávia"];
        this.users.splice(this.users.indexOf(this.loggedin_username), 1);
      } else {
        console.error("Error while trying to get the username. ");        
      }
    });
  }

  openChat(sender: string) {
    this.title = sender;
    this.messages_sent = [];
    this.messages_received = []; 

    chat_data.forEach(element => {
      if((element.sender == this.loggedin_username && element.receiver == sender) || (element.sender == sender && element.receiver == this.loggedin_username)) {
        this.messages_sent.push({id: element.id, sender: element.sender, text: element.message});
      }

      if(element.sender == sender && element.receiver == this.loggedin_username) {
        this.messages_received.push({sender: element.sender, text: element.message});
      }
    });

    this.messages_sent.sort( (a,b) => (a.id < b.id) ? 1 : -1 );
    console.log(this.messages_sent);

  }

  sendMessage() {
    console.log(this.title);
    
    
    // this._service.addMessage();
  }

}
