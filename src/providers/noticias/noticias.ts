import { Injectable} from '@angular/core';
import { HTTP } from '@ionic-native/http';


@Injectable()
export class NoticiasProvider {

  constructor(public http: HTTP) {
  
  }


      getNews(){
          var urljson = 'https://www.oabpr.org.br/feed/';
          return this.http.get(urljson, {}, {});

      }

      getImage(link){
        return this.http.get(link, {responseType: 'text'}, {})

      }
}
