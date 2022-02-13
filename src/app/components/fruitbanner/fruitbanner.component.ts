import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fruitbanner',
  templateUrl: './fruitbanner.component.html',
  styleUrls: ['./fruitbanner.component.css']
})
export class FruitbannerComponent implements OnInit {

  constructor(
  public _uw:UserWService,
  public location: Location,
  public router: Router



  	) { }
   loadAPI = null;  
   url="assets/assetssuper/vendor/OwlCarousel/owl.carousel.js";
   url2 = "assets/assetssuper/js/custom.js";
  ngOnInit() {
  	  if (this._uw.loaded==true){
          this.loadAPI = new Promise(resolve => {
            this.loadScript();
            this.loadScript2();
          });
        }
        this._uw.loaded=true;
  
  }
      public loadScript() {
      let node = document.createElement("script");
      node.src = this.url;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
        public loadScript2() {
      let node = document.createElement("script");
      node.src = this.url2;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
}
