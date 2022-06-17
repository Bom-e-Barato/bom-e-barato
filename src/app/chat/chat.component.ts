import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

export interface chat {
  id : number;
  sender : number;
  receiver : number;
  message : string;
}


/*
-> Qd 'contactar vendedor'
sender    =   user_logado
receiver  =   vendedor(recebo id do outro componente)
-> Qd 'Mensagens'
receiver  =   user_logado
sender    =   vendedores

--- Como obter vendedores?
1) getConversation(receiver=user_logado)
*/


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat_data : chat[] = []
  users : any[] = [];
  users_id : number[] = [];
  title : string = "";
  messages_sent : any[] = [];
  messages_received : any[] = [];
  sender! : number;
  seller_id! : number;
  content : string = "";
  logged_user_id! : number;

  // just for testing purposes
  loggedin_username : string = "";

  constructor(private _service : SharedService, private _router : Router) {
    this.loadPage(null);
  }

  ngOnInit(): void {
  }

  openChat(sender: any) {
    this.title = sender.name;
    this.messages_sent = [];
    this.messages_received = [];
    this.seller_id = sender.id;
    console.log(this.chat_data);
    console.log(this.seller_id)
    
    this.chat_data.forEach(element => {      
      if((element.sender == this.logged_user_id && element.receiver == Number(this.seller_id)) || (element.sender == Number(this.seller_id) && element.receiver == this.logged_user_id)) {
        this.messages_sent.push({id: element.id, sender: element.sender, text: element.message});
      }
    });
    console.log(this.messages_sent);
    this.messages_sent.sort( (a,b) => (a.id < b.id) ? 1 : -1 );
  }

  sendMessage() {
    var receiver_id = this.seller_id; 
    
    this._service.addMessage(receiver_id, this.content).subscribe((data:any) => {
      if(data.v == true) {
        console.log("Message sent");
        this.refreshChat(receiver_id);
      } else {
        console.log(data);
        
        console.error("Error while trying to send the message. ");        
      }
    });
  }

  refreshChat(chat_id : number) {
    this._service.getConversation(chat_id).subscribe((data : any) => {
      console.log(data);
      data.forEach((element : any) => {
        if(element.includes("sender:")) {
          this.chat_data.push({id:this.chat_data.length+1, sender:this.logged_user_id, receiver: chat_id, message:element.split("sender:").pop()})
        } else if(element.includes("receiver:")) {
          this.chat_data.push({id: this.chat_data.length+1, sender: chat_id, receiver: this.logged_user_id, message: element.split("receiver:").pop()})
        }
      });

      this.openChat(chat_id);
    });
  }

  loadPage(chat_id : number | null) {
    this._service.getCredentials().subscribe((data:any) => {
      if(data.v == true) {        
        this.loggedin_username = data.info.first_name;
        this.logged_user_id = data.info.id;        
                
        // Get all id and name for users with existing chat
        this._service.getMessages().subscribe((data : any) => {
          this.users = data;
          
          // Get all chat messages
          this.chat_data = [];
          this.users.forEach((element: any) => {
            this._service.getConversation(element.id).subscribe((data : any) => {
              
              
              data.forEach((e : any) => {
                console.log(e);
                
                if(e.includes("sender:")) {
                  this.chat_data.push({id:this.chat_data.length+1, sender:this.logged_user_id, receiver: element.id, message:e.split("sender:").pop()})
                } else if(e.includes("receiver:")) {
                  this.chat_data.push({id: this.chat_data.length+1, sender: element.id, receiver: this.logged_user_id, message: e.split("receiver:").pop()})
                }
              });
            });

          });          
        });
      } else {
        console.error("Error while trying to get the username. ");
        console.log(data);
      }
    });
  }
}
