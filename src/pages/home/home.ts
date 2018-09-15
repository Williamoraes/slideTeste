import { Component} from '@angular/core';
import { NavController, List } from 'ionic-angular';
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
  news = [];

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
                          
                          var testeTitles = [];
                          var testeDates = [];
                          var testeLinks = [];
                         
                          var textResponse = (data as string);   
                          var _capTitle = textResponse.split("title");
                          var _capDate = textResponse.split("pubDate");
                          var _capLink = textResponse.split("link");

                          testeTitles = this.treatsArray(_capTitle);
                          testeDates = this.treatsArray(_capDate);
                          testeLinks = this.treatsArray(_capLink);

                           this.news = this.getListOfNews();
                      //    console.log
                        //  news[1].title = "will";
                          for(let c=1; c<testeTitles.length;c++){

                            this.news[c-1].title = testeTitles[c].substring(1,testeTitles[c].length-2);
                            this.news[c-1].date = testeDates[c-1].substring(1,testeDates[c-1].length-2);
                            this.news[c-1].link = testeLinks[c].substring(1,testeLinks[c].length-2);
                         //   this.teste.push(this.news[0]);
                            this.titles[c-1] = testeTitles[c].substring(1,testeTitles[c].length-2);
                        //     this.dates[c-1] = testeDates[c-1].substring(1,testeDates[c-1].length-2);
                            this.links[c-1] = testeLinks[c].substring(1,testeLinks[c].length-2);
                            // console.log(news);
                          }  
 
                          console.log(this.news);
   
                          this.formatDate(this.news);
                         
                          return this.links;   

                      }, err =>{
                          console.log(err);
                          
                      }).then(data =>{ 
                        
                        var _data = data as Array<any>;
                        this.getImg(_data);

                      });          
  }

  treatsArray(array : string[]) : any[]{
    var arrayFinal = [];
    for(let i=0; i<array.length;i++){
      if(array[i].slice(-1) == '/'){
        arrayFinal.push(array[i])
      }
    }
    return arrayFinal;
  }

  getImg(_data : Array<any>){
    var _capImg = [];
    var _capImgEf = []
  
    for(let i=0; i< _data.length; i++){
      this._noticiasProvider.getImage(_data[i]).subscribe(data => { // requisição IMG

        const responseImg = (data as string);
        _capImg = responseImg.split('"og:image" content="');
        _capImgEf = _capImg[1].split('" />');
        this.news[i].img = _capImgEf[0];
      });
    }
    console.log(this.news)
  }

  formatDate(array){
    for(let i=0; i<array.length; i++){
      this.dateNew[i] = array[i].date.substring(0, array[i].date.length - 5);
      var dataAtz = new Date(this.dateNew[i]);
        var dia=dataAtz.getDate();
        var mes=dataAtz.getMonth()+1;
        var ano=dataAtz.getFullYear();
        var hora=dataAtz.getHours();
        var minuto=dataAtz.getMinutes();
        this.news[i].date=this.zeroFill(dia,2)+"."+this.zeroFill(mes,2)+"."+ano+" | "+this.zeroFill(hora,2)+":"+this.zeroFill(minuto,2);
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

  getListOfNews(){
    var ListOfNews = [{
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    },
    {
      title: "",
      date: "",
      link: "",
      img: "",
    }];

    return ListOfNews;
  }
}
