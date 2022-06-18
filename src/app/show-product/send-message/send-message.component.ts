import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';

export interface DialogData {
  id:number;
}

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  content! : string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _service : SharedService
    ) {}

  ngOnInit(): void {
  }

  sendMessage() {
    var receiver_id = this.data.id; 
    
    this._service.addMessage(receiver_id, this.content).subscribe((data:any) => {
      if(data.v == true) {
        console.log("Message sent");
      } else {
        console.log(data);
        console.error("Error while trying to send the message. ");        
      }
    });
  }

}
