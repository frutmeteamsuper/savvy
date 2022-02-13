import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fruitfooter',
  templateUrl: './fruitfooter.component.html',
  styleUrls: ['./fruitfooter.component.css']
})
export class FruitfooterComponent implements OnInit {

  constructor(
	 public location: Location,
    public router: Router
  	) { }

  ngOnInit() {
  }

}
