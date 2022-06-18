import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  logged_user_id! : number;

  // just for testing purposes
  loggedin_username : string = "";

  constructor(
    public dialogRef: MatDialogRef<SendMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _service : SharedService
    ) {}

  ngOnInit(): void {
  }

  sendMessage() {
    this._service.getCredentials().subscribe((data:any) => {
      if(data.v == true) {        
        this.loggedin_username = data.info.first_name;
        this.logged_user_id = data.info.id;        

        this._service.addMessage(receiver_id, this.content).subscribe((data:any) => {
          if(data.v == true) {
            console.log("Message sent");
          } else {
            console.log(data);
            console.error("Error while trying to send the message. ");        
          }
        });

      } else {
        console.error("Error while trying to get the username. ");
        console.log(data);
      }
    });
    var receiver_id = this.data.id; 
    this.dialogRef.close();
  }

}
