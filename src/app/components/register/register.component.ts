import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { TixInterface } from '../../models/tix-interface';
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
  public scrollTopService:ScrollTopService,
  public _uw:UserWService,
  private dataApi: DataApiService
     ) { }
     loadAPI = null;  

  url = "assets/assetssavvy/js/latinos.js";

     public tixs:TixInterface;
     public loadScript() {
      let node = document.createElement("script");
      node.src = this.url;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  
  ngOnInit() {
    if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
     
        });
      }
    this._uw.loaded=true;
  }
}
