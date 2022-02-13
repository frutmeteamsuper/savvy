import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { TixInterface } from '../../models/tix-interface'; 

@Component({
  selector: 'app-fruitproducts',
  templateUrl: './fruitproducts.component.html',
  styleUrls: ['./fruitproducts.component.css']
})
export class FruitproductsComponent implements OnInit {
  info:any={};
 
  constructor(
  public _uw:UserWService,
  private dataApi: DataApiService
  ){}
  public tixs:TixInterface;
  public tixsVegetales:TixInterface;
  public tixsFrutas:TixInterface;
  public tixsExquiciteces:TixInterface;
  loadAPI = null;  

  url = "assets/assetsfruit/js/magnific-popup.min.js";
  url2 = "assets/assetsfruit/js/popper.min.js";
  url3 = "assets/assetsfruit/js/scripts.js";

  public viewProduct(tix){
    let tixToView = tix;
    this._uw.tixPreview=tixToView;
    this._uw.tixPreview.quantity=1; 
    this._uw.imagePreviewProduct=this._uw.tixPreview.images[0];
    this.getAllTixs();
  } 

 loadInfo(){
    this.dataApi
    .getInfo()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.info=res;
        this._uw.info=this.info;
        }
     });
  }

  public refresh(){
    this.loadInfo();
    this.getAllTixs();
  }
  public globalCategoryOff(){
    this._uw.globalCategory=false;
    this._uw.filter=false;
  }
    public globalCategoryOn(){
    this._uw.globalCategory=true;
    // this._uw.filter=false;
  }
  getAllTixs(){
    this.dataApi
    .getAllTixs()
    .subscribe((tixs: TixInterface) => (this.tixs=tixs));
  }
  ngOnInit() {

  	if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
        this.loadScript2();
        this.loadScript3();
        });
      }
    this._uw.loaded=true;
    this.getAllTixs();
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
  public loadScript3() {
    let node = document.createElement("script");
    node.src = this.url3;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
}

