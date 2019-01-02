import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: String = '';
  password: String = '';
  mail: String = '';

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }
  //Skapar ny user
  createNewUser(user){
    let payload = {
      username: this.username,
      password: this.password,
      mail: this.mail
    }
    this.appService.createNewUser(payload);
    alert("New user has been created");
    window.location.reload();
  }
}
