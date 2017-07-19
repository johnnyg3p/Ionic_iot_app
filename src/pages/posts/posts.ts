import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Http} from '@angular/http';

@Component({
  templateUrl: 'posts.html'
})
  export class PostsPage  implements OnInit{

  public posts;

  constructor(public navCtrl:NavController,
              private _http:Http,
              private _loadingCtrl:LoadingController,
              private _alertCtrl:AlertController) {
  }

  ngOnInit(){

    let twitter = [{"user":"Reinaldo Manzano Jr.","text":"Test with location #enchente","date":1500160020000,"location":null}];

    this.posts = twitter;

    let loader = this._loadingCtrl.create({
      content: "Buscando novos dados"
    });
    loader.present();


    //noinspection TypeScriptValidateTypes
    this._http
      .get("http://tarc.us-east-2.elasticbeanstalk.com:8000/twitter")
      .map(res => res.json())
      .toPromise()
      .then(
        posts => {
        this.posts = posts;
        loader.dismiss();
      })
      .catch(error => {
        this.posts = twitter;
        loader.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha na Conexão",
            buttons: [{text: "OK"}],
            subTitle: "Não foi possível conectar ao servidor tente novamente"
          }).present();
      });





  }


}
