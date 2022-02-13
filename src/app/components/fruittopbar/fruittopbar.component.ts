// import { Component, OnInit } from '@angular/core';
// import { UserWService } from "../../services/user-w.service";
// import { DataApiService } from '../../services/data-api.service';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
import { TixInterface } from '../../models/tix-interface'; 


import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

import { DemoFilePickerAdapter } from  '../../file-picker.adapter';
import { FilePickerComponent } from '../../../assets/file-picker/src/lib/file-picker.component';
import { FilePreviewModel } from '../../../assets/file-picker/src/lib/file-preview.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { isError } from "util";
import { PagoInterface } from '../../models/pago-interface'; 
import { OrderInterface } from '../../models/order-interface';

import { UserWService } from '../../services/user-w.service';
import { DataApiService } from '../../services/data-api.service';
import { ValidationError } from '../../../assets/file-picker/src/lib/validation-error.model';

@Component({
  selector: 'app-fruittopbar',
  templateUrl: './fruittopbar.component.html',
  styleUrls: ['./fruittopbar.component.css']
})
export class FruittopbarComponent implements OnInit {
 adapter = new DemoFilePickerAdapter(this.http,this._uw);
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
   myFiles: FilePreviewModel[] = [];
  info:any={};
  constructor(
    public _uw:UserWService,
    private dataApi: DataApiService,
    public router: Router,
    public scrollTopService:ScrollTopService,
    private http: HttpClient,
    private location: Location,
    private formBuilder: FormBuilder
	) { }
  npedido=0;
    public orders:OrderInterface;
    public tixs:TixInterface;
    public tixToAdd:TixInterface;
    public order : OrderInterface ={
      car:[],
      currency:"",
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
 ngFormSendOrder: FormGroup;
 email = false;
 data = false;
 method = false;
  submitted = false;
  loadAPI = null;  
  filter(parametro:string){
    if(this._uw.allLoaded!=true){
        // this.getAllTixs();
        this._uw.showAll=true;
        this._uw.allLoaded=true;
    }
    this._uw.showAll=false;
    this._uw.categorySelected=parametro;
  }
  public aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
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


    if(this._uw.currency==this._uw.info[0].usd){
          this.order.currency="usd";

    }
    else
    {
          this.order.currency="BsS";
    }

      
     if ( this._uw.method==="paypal" || this._uw.method==="zelle"|| this._uw.method==="usdt"){

      this.order.total=((this._uw.total*this._uw.comision/100)+this._uw.total)*this._uw.currency ;
     }

      else{

      this.order.total=this._uw.total * this._uw.currency ;
     }
    
       this.order.metodo=this._uw.method;
      this.npedido=this.aleatorio(10000,99999);
      let npedidoString = this.npedido.toString();
      this.order.npedido=npedidoString;
      this.order.steeps=[
        {steep:true},
        {steep:false},
        {steep:false},
        {steep:false}
      ];
      // this.order.total=(this._uw.subTotal*this._uw.currency);
      this.order.car=this._uw.car;
      this._uw.order=this.order;
      this._uw.pedido.asunto="Nuevo pedido";
      this._uw.pedido.nroReserva=this.order.npedido;
      this._uw.pedido.adminName="admin name",
      this._uw.pedido.productName="test",
      this._uw.pedido.nombre="tester",
      this._uw.pedido.fecha="hoy",
      this._uw.pedido.precioUni=10,
      this._uw.pedido.cant=2,
      this._uw.pedido.monto=100,
      this._uw.pedido.adelanto=30,
      this._uw.pedido.email=this._uw.order.email,
      // this._uw.pedido.adminName=this._uw.info[0].adminName;
      // this._uw.pedido.adminEmail=this._uw.info[0].adminEmail;
      this.dataApi.sendMailNewBookAppToAdmin(this._uw.pedido).subscribe();
      console.log("enviando...");
      this.dataApi.saveOrder(this._uw.order).subscribe(
            tix => this.router.navigate(['/pago'])
        );
    }




loadmore(){
  this.getAllTixs();
  this.getTamano();
     // this.scrollTopService.setScrollTop();
  this._uw.allLoaded=true;
  this._uw.showAll=true;
}
getTamano(){
    this.dataApi
    .getTamano()
    .subscribe((res:any) => {
      if (res[0] === undefined){
        return
        }else{
         this._uw.totalTixs = res.length;
        }
      });
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
  loadInfo1(){   
    this.dataApi
    .getInfo()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.info=res;
        this._uw.info=this.info;
        this._uw.currency=this._uw.info[0].bs;

        }
     });
  }
  setBs(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].bs;
  }
  setUsd(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].usd;
  }

oncart(index){
   let id=index;
  this.tixs[id].oncart=true;
  // console.log("en el carrito");
   this.cartCalculate();
}

cartCalculate(){
  this._uw.car =[];
  this._uw.numProd=0;
  this._uw.total=0;
  // console.log("tamaño: "+this._uw.totalTixs)
  for (let i = 0; i < this._uw.totalTixs; i++){
    if (this.tixs[i].quantity>0){
      this._uw.car.push(this.tixs[i]);
      this._uw.numProd=this._uw.numProd+1;
      this._uw.total=this._uw.total+(this.tixs[i].quantity*this.tixs[i].globalPrice);
    }
  }
}


  getAllTixs(){
    this.dataApi
    .getAllTixs()
    .subscribe((res:any) => {
      if (res[0] === undefined){
        return
        }else{

          this.tixs=res[0];

         this._uw.totalTixs = res.length;
        }
      });
  }
  setMethod(method){
    let met = method;
    this._uw.method=met;
    if(met=="zelle" || met=="paypal" || met=="efectivo" || met=="usdt"){
      this.setUsd();
      if(met=="paypal"){
        this._uw.comision=this._uw.info[0].paypal;
        this._uw.paypal=true;
        this._uw.zelle=false;
        this._uw.usdt=false;
      }
      if(met=="usdt"){
        this._uw.paypal=false;
        this._uw.comision=this._uw.info[0].usdt;
        this._uw.usdt=true;
        this._uw.zelle=false;
      }
      if(met=="zelle"){
        this._uw.comision=this._uw.info[0].zelle;
        this._uw.usdt=false;
        this._uw.zelle=true;
        this._uw.paypal=false;
      }
       if(met=="efectivo"){
        this._uw.comision=0;
        this._uw.usdt=false;
        this._uw.zelle=false;
             this._uw.paypal=false;
      }

    }
      if(met=="pagomovil" || met=="bstransferencia"){
      this.setBs();
      this._uw.comision=0;
      this._uw.paypal=false;
      this._uw.usdt=false;
       this._uw.zelle=false;
    }
  }

 procesar(){
  this._uw.feet=1;
  this.email=true;
 }


toData(){
  this.data=true;
  this.email=true;
  this._uw.feet=2;
  
}
toMethod(){
  this.method=true;
   this.data=true;
   this._uw.feet=3;
}



to1(){
   this._uw.feet=1;
}

atras(){
  this._uw.feet=0;
}

to2(){
  this._uw.feet=2;
}
to3(){
  this._uw.feet=3;
}

 get fval() {
      return this.ngFormSendOrder.controls;
    }

  ngOnInit() {
    this._uw.feet=0;
    if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadInfo1();
      });
    }
    this._uw.loaded=true;  	
    this.ngFormSendOrder = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      personaContacto: ['', [Validators.required]],
      // metodo:['',[Validators.required]],
      email: ['', [Validators.required]]
      // total: [0,[Validators.required]]
    });
  }
}
