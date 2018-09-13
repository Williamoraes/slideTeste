import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoticiasProvider } from '../../providers/noticias/noticias';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  atzString = new Array<any>();
  titles = new Array<any>();
  dates = new Array<any>();
  links = new Array<any>();
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
                        .then(data =>{ 

                          var testeTitles = [];
                          var testeDates =[];
                          var testeLinks = [];
                        
                          var textResponse = (data.data as string);   
                          var _capTitle = textResponse.split("title");
                          var _capDate = textResponse.split("pubDate");
                          var _capLink = textResponse.split("link");

                          for(let i=0; i<_capTitle.length;i++){
                            if(_capTitle[i].slice(-1) == '/'){
                              testeTitles.push(_capTitle[i])
                            }
                          } 
                          for(let i=0; i<_capDate.length;i++){
                            if(_capDate[i].slice(-1) == '/'){
                              testeDates.push(_capDate[i])
                            }
                          }
                          
                          for(let i=0; i<_capLink.length;i++){
                            if(_capLink[i].slice(-1) == '/'){
                              testeLinks.push(_capLink[i])
                            }
                          }

                          for(let c=1; c<testeTitles.length;c++){
                             this.titles[c-1] = testeTitles[c].substring(1,testeTitles[c].length-2);
                             this.dates[c-1] = testeDates[c-1].substring(1,testeDates[c-1].length-2);
                             this.links[c-1] = testeLinks[c].substring(1,testeLinks[c].length-2);
                          }  
   
                          this.formatDate(this.dates);
                         
                          return this.links;   

                      }, err =>{
                          console.log(err);
                          
                      }).then(data =>{ 
                        
                        var _data = data as Array<any>;
                        this.getImg(_data);

                      });          
  }

  getImg(_data : Array<any>){
    var _capImg = [];
    var _capImgEf = []
  
    for(let i=0; i< _data.length; i++){
      this._noticiasProvider.getImage(_data[i]).then(data => { // requisição IMG
        const responseImg = (data.data as string);
        _capImg = responseImg.split('"og:image" content="');
        _capImgEf = _capImg[1].split('" />');
        console.log(_capImgEf);
        this.content[i] = _capImgEf[0];
      });
    }
    console.log(this.content);
  }

  formatDate(date : Array<any>){
    for(let i=0; i<date.length; i++){
      this.dateNew[i] = date[i].substring(0, date[i].length - 5);
      var dataAtz = new Date(this.dateNew[i]);
        var dia=dataAtz.getDate();
        var mes=dataAtz.getMonth()+1;
        var ano=dataAtz.getFullYear();
        var hora=dataAtz.getHours();
        var minuto=dataAtz.getMinutes();
        this.atzString[i]=this.zeroFill(dia,2)+"."+this.zeroFill(mes,2)+"."+ano+" | "+this.zeroFill(hora,2)+":"+this.zeroFill(minuto,2);
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
