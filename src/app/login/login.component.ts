import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: "";
  password:"";
  responseCode:"";

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
  }
login(){
  let payload = {
    "username": this.username,
    "password": this.password
  }
  console.log(payload.username + "++" + payload.password);
  this.appService.login(payload);
  this.router.navigate(['/']);
}


}
