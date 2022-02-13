import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { OrderInterface } from '../../models/order-interface';
import { SaleInterface } from '../../models/sale-interface'; 
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { isError } from "util";

@Component({
  selector: 'app-fruitcart',
  templateUrl: './fruitcart.component.html',
  styleUrls: ['./fruitcart.component.css']
})
export class FruitcartComponent implements OnInit {
  info:any={};
  constructor(
    public scrollTopService:ScrollTopService,
  	public _uw:UserWService,
  	private dataApi: DataApiService,
  	private router: Router,
  	private location: Location,
    private formBuilder: FormBuilder
  	) { }
  npedido=0;
    loadAPI = null;
    recargo=0;  
    url4="assets/assetsfruit/js/jquery.parallax-scroll.js";
    url5 = "assets/assetsfruit/js/scripts.js";
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
  public aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }
    stepUno=true;
    stepDos=false;
    stepTres=false;
    public setStepDos(){
      this.scrollTopService.setScrollTop();
      this.stepDos=true;
      this.stepUno=false;
      this.stepTres=false;
    }
    public setStepUno(){
      this.scrollTopService.setScrollTop();
      this.stepDos=false;
      this.stepUno=true;
      this.stepTres=false;
    }
    public setStepTres(){
      this.scrollTopService.setScrollTop();
      this.stepDos=false;
      this.stepUno=false;
      this.stepTres=true;
    }

    public sale : SaleInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
      id:"",
      personaContacto:"",
      total:0
    };
    public order : OrderInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
      id:"",
      steeps:[
        {steep:true},
        {steep:false},
        {steep:false},
        {steep:false}
      ],
      personaContacto:"",
      total:0
    };

    ngFormSendSale: FormGroup;
    ngFormSendOrder: FormGroup;
    submitted = false;

    url = "assets/assetsfruit/js/magnific-popup.min.js";
    url2 = "assets/assetsfruit/js/popper.min.js";
    url3 = "assets/assetsfruit/js/scripts.js";

    ngOnInit() {
      this.stepUno=true;
      if(this._uw.numProd<1){
      this.router.navigate(['/']);
    }
    this.ngFormSendSale = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      personaContacto: ['', [Validators.required]],
      metodo:['',[Validators.required]],
      email: ['', [Validators.required]],
      total: [0,[Validators.required]]
    });

    this.ngFormSendOrder = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      personaContacto: ['', [Validators.required]],
      metodo:['',[Validators.required]],
      email: ['', [Validators.required]],
      total: [0,[Validators.required]]
    });

  	if (this._uw.loaded==true){
  	    this.loadAPI = new Promise(resolve => {
          this.loadScript();
          this.loadScript2();
          this.loadScript4();
          this.loadScript3();
          });
        }
      this._uw.loaded=true;
    }

    public loadScript4() {
      let node = document.createElement("script");
      node.src = this.url4;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
    public loadScript5() {
      let node = document.createElement("script");
      node.src = this.url5;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
    setColp(){
      this.loadInfo();
      this._uw.currency=this._uw.info[0].colp;
    }
    setBs(){
      this.loadInfo();
      this._uw.currency=this._uw.info[0].bs;
    }
    setUsd(){
      this.loadInfo();
   
      this._uw.currency=this._uw.info[0].usd;
    }

    public setMetodo(){
      if(this.ngFormSendOrder.value.metodo=="bsTansferencia"){
           this.recargo=0;
           this._uw.recargo=false;
        this.setBs();
      }   
       if(this.ngFormSendOrder.value.metodo=="bitcoin"){
          this.setUsd();
         this.recargo=(this._uw.subTotal*this._uw.currency)*(this._uw.info[0].bitcoin/100);
             this._uw.recargo=true;
      } 
      if(this.ngFormSendOrder.value.metodo=="paypal"){
          this.setUsd();
          this.recargo=(this._uw.subTotal*this._uw.currency)*(this._uw.info[0].paypal/100);
             this._uw.recargo=true;
      } 
      if(this.ngFormSendOrder.value.metodo=="usdt"){
          this.setUsd();
          this.recargo=(this._uw.subTotal*this._uw.currency)*(this._uw.info[0].usdt/100);
             this._uw.recargo=true;
      } 
       if(this.ngFormSendOrder.value.metodo=="bsTansferencia"){
        this.recargo=0;
        this.setBs();
           this._uw.recargo=false;
      } 
       if(this.ngFormSendOrder.value.metodo=="bsPunto"){
        this.recargo=0;
        this.setBs();
           this._uw.recargo=false;
      } 
       if(this.ngFormSendOrder.value.metodo=="colp"){
        this.recargo=0;
        this.setColp();
           this._uw.recargo=false;
      } 
       if(this.ngFormSendOrder.value.metodo=="usd"){
        this.recargo=0;
          this.setUsd();
             this._uw.recargo=false;
      }    
       if(this.ngFormSendOrder.value.metodo=="usdt"){
        this.recargo=0;
          this.setUsd();
             this._uw.recargo=true;
      }      
    }

   
    public okOrder(){
      this.submitted = true;
        if (this.ngFormSendOrder.invalid) {
          this._uw.errorFormSendOrder=true;
        return;
            } 
      this._uw.errorFormSendOrder=false;
      this.order = this.ngFormSendOrder.value;
      this.order.status="new";
      this.npedido=this.aleatorio(10000,99999);
      let npedidoString = this.npedido.toString();
      this.order.npedido=npedidoString;
      this.order.steeps=[
        {steep:true},
        {steep:false},
        {steep:false},
        {steep:false}
      ];
      this.order.total=(this._uw.subTotal*this._uw.currency);
      this.order.car=this._uw.car;
      this._uw.pedido.asunto="Nuevo pedido";
      this._uw.pedido.adminName=this._uw.info[0].adminName;
      this._uw.pedido.adminEmail=this._uw.info[0].adminEmail;
      //this.dataApi.sendMailNewBookAppToAdmin(this._uw.pedido).subscribe();
      this._uw.order=this.order;
      this.dataApi.saveOrder(this.order).subscribe(
            tix => this.router.navigate(['/pago'])
        );
    }

    public minus(index){
    	let id=index;
      if(this._uw.car[id].quantity>1){      
      this._uw.car[id].quantity=this._uw.car[index].quantity-1;
      this._uw.subTotal=this._uw.subTotal-(1*this._uw.car[id].globalPrice);
      }
    }
    public plus(index){
    	let id=index;
      this._uw.car[id].quantity=this._uw.car[index].quantity+1;
      this._uw.subTotal=this._uw.subTotal+(1*this._uw.car[id].globalPrice);
    }
    remove(i){
      this._uw.subTotal=this._uw.subTotal-(this._uw.car[i].quantity*this._uw.car[i].globalPrice);
      this._uw.car.splice(i, 1);
      this._uw.numProd=this._uw.numProd-1;
      if(this._uw.numProd<1){
      	this.router.navigate(['/']);
      }
    } 
    get fval() {
      return this.ngFormSendOrder.controls;
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
     public sendBook(){
    // this.dataApi.sendMailNewBookAppToAdmin(this._uw.pedido).subscribe();  ACTIVAR EST LINEA

     // this.dataApi.saveBook(this._uw.book).subscribe();
 
    // this.dataApi.senMailNewBookAppToAdmin(this._uw.book).subscribe();
    // this.router.navigate(['/successbook'])      
    }
  
}
