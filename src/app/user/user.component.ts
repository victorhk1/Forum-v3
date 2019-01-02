import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../app.service';
import { User } from '../appClasses';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar användar-ID från adressfält
    let id = this.route.snapshot.paramMap.get('_id');

    // Hämtar användare som stämmer överens med ID:t
    this.appService.getUser(id)
    .subscribe(data =>this.user=data);
  }

}
