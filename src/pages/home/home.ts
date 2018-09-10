import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoticiasProvider } from '../../providers/noticias/noticias';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  response: any;
  atzString = new Array<any>();
  listNews = new Array<any>();
  dateNew = [];
  content = new Array<any>();

  constructor(public navCtrl: NavController, 
              private _noticiasProvider: NoticiasProvider) {

  }

  ionViewDidLoad(){
    this.getNews();
  }



  getNews(){
    
   this._noticiasProvider.getNews()
                        .toPromise()
                        .then(data =>{ 
                          const response = data as any;
                          this.getInfo(response); // requisição dados da noticia (title, data);

                          return response   

                      }, err =>{
                          console.log(err);
                          
                      }).then(data =>{ 
                        var allContent= [];
                        for(let i=0; i< data.list.length; i++){
                          this._noticiasProvider.getImage(data.list[i].link).subscribe(data => { // requisição IMG
                            const responseImg = data as any;
                            document.getElementById('img').innerHTML = responseImg;
                            var img = document.getElementById('img').getElementsByTagName('meta');
                            for(let j=0; j<img.length; j++){
                              allContent[j] = img[j].getAttribute('content');
                              var patt = new RegExp('.jp');
                              var contain = patt.test(allContent[j]);
                              if(contain == true){
                                this.content[i] = allContent[j];
                                console.log(allContent[j]);
                              }
                            }
                          });
                        }
                      })                  
  }

  getInfo(response){
    for(let i=0; i< response.list.length; i++){
      this.listNews[i] = response.list[i];
        if (this.listNews[i].date){
        this.dateNew[i] = this.listNews[i].date.substring(0, this.listNews[i].date.length - 5);
        var dataAtz =new Date(this.dateNew[i]);
        var dia=dataAtz.getDate();
        var mes=dataAtz.getMonth()+1;
        var ano=dataAtz.getFullYear();
        var hora=dataAtz.getHours();
        var minuto=dataAtz.getMinutes();
        this.atzString[i]=this.zeroFill(dia,2)+"."+this.zeroFill(mes,2)+"."+ano+" | "+this.zeroFill(hora,2)+":"+this.zeroFill(minuto,2);
        }
    }
  }

  zeroFill( number, width )
  {
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
  }

}
