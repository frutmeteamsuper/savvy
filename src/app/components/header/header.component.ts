import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { TixInterface } from '../../models/tix-interface';
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  constructor(
  public scrollTopService:ScrollTopService,
  public _uw:UserWService,
  private dataApi: DataApiService,
  public authService: AuthService
     ) { }
     public tixs:TixInterface;
     public router:Router
    public location:Location
  ngOnInit() {
    this.onCheckUser();
  }
  onLogout():void{
    this.authService.logoutUser();
    location.reload();
  
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
}