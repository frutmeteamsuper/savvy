import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { TixInterface } from '../../models/tix-interface';
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { InfoInterface } from 'src/app/models/info-interface';
@Component({
  selector: 'app-testapp',
  templateUrl: './testapp.component.html',
  styleUrls: ['./testapp.component.css']
})
export class TestappComponent implements OnInit {

  constructor(
  public scrollTopService:ScrollTopService,
  public _uw:UserWService,
  public dataApi: DataApiService
     ) { }
     loadAPI = null;  
     public info:InfoInterface;
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
  public getInfo(){
    this.dataApi.getInfo()
    .subscribe((info: InfoInterface) => (this.info=info));
    console.log(this.info);
  }
  ngOnInit() {
//    this.info[0].services=["null"];
    if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
     
        });
      }
    this._uw.loaded=true;
    this.getInfo();
  }
}
