import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';


@Injectable()
export class NoticiasProvider {

  constructor(public http: HttpClient) {
  
  }


      getNews(){
        
          var urljson = 'https://www.oabpr.org.br/feed/';

          return this.http.get("http://manager.thisplay.com.br/RSS2JSON.do?url=" + encodeURIComponent(urljson));
      }

      getImage(link){
        console.log(link);
        return this.http.get(link, {responseType: 'text'})
      }
}
