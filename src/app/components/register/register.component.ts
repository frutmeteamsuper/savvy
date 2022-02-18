import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { InfoInterface } from 'src/app/models/info-interface';

import { TixInterface } from '../../models/tix-interface';
import { isError } from "util";
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { UserInterface } from 'src/app/models/user-interface';
import { CardInterface} from'src/app/models/card-interface';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user : UserInterface ={
    email:"",
    userType:"",
    password:"",
    status:"",
  };
  services:any={};
  public info:InfoInterface;
   message = "";  
ngFormSignup: FormGroup;
submitted = false;
llc=false;
copr=false;
successform=false;
setted=false;
actype="undefined";
text="¿Qué tipo de empresa deseas registrar?";
politics = false;
public isError = false;
public waiting = false;
public msgError = '';
  constructor(
    public toastr: ToastrService,
   private formBuilder: FormBuilder,
  public scrollTopService:ScrollTopService,
  public _uw:UserWService,
  private authService: AuthService,
  public router:Router,
  private dataApi: DataApiService
     ) { }
     public cardSubmit : CardInterface ={
      username:"",
      status:"",
      images:[],
      services:[],
      userd:"",
      phone:""
    }; 
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
    setServices(p:string){
      let servicesSize=this.info[0].services.length;
      this.cardSubmit.services=[];
      for (let i=0;i <servicesSize;i++){
        if(this.actype==this.info[0].services[i].userType){
          this.cardSubmit.services.push(this.info[0].services[i])
        }
      }
    }
    setType(p:string){
      if (p=="llc"){
        this.actype="llc";
        this.text="Empresa LLC"
        this.setServices(p);
      };
      if (p=="corp"){
        this.actype="corp";
        this.text="Empresa Corporación"
        this.setServices(p);
      };
      this.setted=true;
    }
    unseted(){
      this.setted=false;
      this.actype="undefined";
      this.text="¿Qué tipo de empresa eres?";
    }
    setPolitics(){
      if (this.politics==true){this.politics=false}else{this.politics=true}
    }
    public getInfo(){
  this.dataApi.getInfo()
  .subscribe((info: InfoInterface) => (this.info=info));
  console.log(this.info);
}
  ngOnInit() {
    this.getInfo();
    if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        this.loadScript();
     
        });
      }
    this._uw.loaded=true;
    this.ngFormSignup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  onRegister(){
   this.submitted=true;
    if (this.ngFormSignup.valid){
      this.isError = false;
      this.waiting=true;
      this.user.userType=this.actype;
      this.user.status='new';
      this.cardSubmit.username=this.user.email;
      this.cardSubmit.images[0]="https://www.buckapiservices.com/developer.png";
      this.authService
        .registerUser( 
          this.user.email, 
          this.user.password, 
          this.user.status, 
          this.user.userType)
        .subscribe(
          user => {    
            this._uw.card=user;
          this.authService.setUser(user);
          const token = user.id;
          this.cardSubmit.userd='p'+token;
          this._uw.userd=this.cardSubmit.userd;  
          this.authService.setToken(token);
          }, 
          error => {
                if(error.status==422){
                this.isError = true;
                this.waiting=false;
                this.message="La dirección de correo ya se encuentra registrada";
              }
          }
        );
      this.cardSubmit.type=this.actype;
      this.cardSubmit.status='new';
      setTimeout(() => {
        if (this.isError==false){  
      
          this.savecard(this.cardSubmit);
       //   this.isError = false;
          }
        else{
          this.waiting=false;
        } 
      }, 5000);

    } 
    else {
      this.onIsError();
    }
  }
  showSuccess() {
    this.toastr.success('Su registro ha sido exitoso!', 'OK' , {
      progressBar:true,
      progressAnimation:'increasing',

      timeOut: 5000
  })
             }

  public savecard(card:CardInterface){
    return this.dataApi.saveCard(this.cardSubmit)
       .subscribe(
            cardSubmit => 
            {
            console.log("cuenta creada")
            this.waiting=false
            this.successform=true
            this.showSuccess()
            this.text=""
            this.router.navigate(['/account'])
            }// this.router.navigate(['/successregister'])
       );
       this.waiting=false;
}




  get fval() {
  return this.ngFormSignup.controls;
  }
   onIsError(): void {
    this.isError = true;
    this.waiting=false;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
