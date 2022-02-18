import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { UserWService } from 'src/app/services/user-w.service';
import { InfoInterface } from 'src/app/models/info-interface';
import { CardInterface } from 'src/app/models/card-interface';
import { DataApiService } from 'src/app/services/data-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  text="¿Qué tipo de empresa eres?";
  steep=0;
  isLogged = false;
  id="";
  public cardsResult:any[]=[];

  public card:CardInterface={
    userd:"",
    type:"",
    services:[]
  };
  public info:InfoInterface;
  public user : UserInterface ={
    email:"",
    id:"",
    userType:"",
    password:"",
    status:"",
  };
  constructor(
    public router:Router,
    public authService:AuthService,
    public _uw:UserWService,
    public dataApi: DataApiService
  ) { }
public  back(i:any){
if(i>0 ){this.steep=i-1}
}
public getInfo(){
  this.dataApi.getInfo()
  .subscribe((info: InfoInterface) => (this.info=info
    )); 
}
onCheckUser(): void {
  if (this.authService.getCurrentUser() === null) {
    this.isLogged = false;
    this._uw.isLogged=false;
  } else {
    this.isLogged = true;
    this._uw.isLogged=true;
  }
}
public loadCard(){
  if (this.user  != undefined){
    let val=(this.user.id).toString();
    this.dataApi.getCards(val).subscribe((res:any) => {
    this._uw.card= (res[0])}  
    );
  }
}
public next(i:any){this.steep=i+1}
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadCard();
    this.getInfo();
    this.steep=0;
    this.onCheckUser() ;
  }

}
