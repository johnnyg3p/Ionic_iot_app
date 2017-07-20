import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Http} from '@angular/http';

import {EscolhaPage} from '../escolha/escolha'
import {PostsPage} from '../posts/posts'
import {AlertPage} from '../alert/alert'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  public status;
  public timer;
  public dataAtual:string = new Date().toISOString();
  public loader;
  public isDesatre;


  constructor(public navCtrl:NavController,
              private _http:Http,
              private _loadingCtrl:LoadingController,
              private _alertCtrl:AlertController) {


    setInterval(() => {
      console.log('Async operation has ended');
      this.checkMessages();
    }, 1000);

  }

  ngOnInit() {

    this.loader = this._loadingCtrl.create({
      content: "Buscando novos dados"
    });

    this.status = {temp: 1, light: 1, earthquake: false, numberTweetsEnchente: 1, status: "Normal"};





  }

  checkMessages() {
    //noinspection TypeScriptValidateTypes
    this._http
      .get('http://tarc.us-east-2.elasticbeanstalk.com:8000/status')
      .map(res => res.json())
      .toPromise()
      .then(status => {
        // console.log(status);
        this.status = status;
        this.loader.dismiss();
      })
      .catch(error => {
        this. loader.dismiss();
        console.log(error);
        this._alertCtrl
          .create({
            title: "Falha na Conexão",
            buttons: [{text: "OK"}],
            subTitle: "Não foi possível conectar ao servidor tente novamente"
          }).present();
      });

    this.dataAtual = new Date().toISOString();
    if (this.status.status != "Normal") {
      if(this.isDesatre != true){
        this.navCtrl
          .push(AlertPage, {alert: this.status.status});
      }
      this.isDesatre = true;
    }else{
      this.isDesatre = false;
    }
  }


  posts() {
    this.navCtrl
      .push(PostsPage);
  };


  seleciona(carro) {
    this.navCtrl
      .push(EscolhaPage, {carroSelecionado: carro});
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
  }
}
