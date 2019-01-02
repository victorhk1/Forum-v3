import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Category } from '../appClasses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[];


  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar alla kategorier
    this.appService.getCategories()
    .subscribe(data =>this.categories=data);
  }
}
