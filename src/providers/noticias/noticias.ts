import { Injectable} from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class NoticiasProvider {

  constructor(public http: HttpClient) {
  
  }


      getNews(){
          var urljson = 'https://www.oabpr.org.br/feed/';
          return this.http.get(urljson, {responseType: 'text'});

      }

      getImage(link){
        return this.http.get(link, {responseType: 'text'})

      }
}
