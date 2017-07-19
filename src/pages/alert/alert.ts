import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular'

@Component({
  templateUrl: 'alert.html'
})
export class AlertPage  implements OnInit{

  public status;

  constructor(public navParams:NavParams) {

    this.status = this.navParams.get('alert');
    

  }

  ngOnInit() {
    

  }    


}
