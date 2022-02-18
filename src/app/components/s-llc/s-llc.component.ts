import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { UserWService } from 'src/app/services/user-w.service';

@Component({
  selector: 'app-s-llc',
  templateUrl: './s-llc.component.html',
  styleUrls: ['./s-llc.component.css']
})
export class SLlcComponent implements OnInit {
  text="¿Qué tipo de empresa eres?";
  steep=0;
  isLogged = false;
  userType="";
  public user : UserInterface ={
    email:"",
    userType:"",
    password:"",
    status:"",
  };
  constructor(
    public router:Router,
    public authService:AuthService,
    public _uw:UserWService

  ) { }
public  back(i:any){
if(i>0 ){this.steep=i-1}
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
public next(i:any){this.steep=i+1}
  ngOnInit() {
    this.steep=0;
    this.onCheckUser();
    this.userType=this.authService.getCurrentUser().userType;
    console.log(""+this.userType);
  }

}
