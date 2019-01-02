import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Post } from '../appClasses';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  posts: Post[];

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar alla inlägg
    this.appService.getAllPosts()
    .subscribe(data =>this.posts=data);
  }

}
