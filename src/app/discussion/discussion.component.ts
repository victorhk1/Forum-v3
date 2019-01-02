import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../app.service';
import { Post } from '../appClasses';
import { Category } from '../appClasses';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  post: Post;
  comments: Post[];
  category: Category;
  
  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar inläggs-ID från adressfält
    let _id = this.route.snapshot.paramMap.get('_id');

    // Hämtar specifikt inlägg som stämmer överens med ID
    this.appService.getPost(_id)
    .subscribe(data => this.post=data);

    // Hämtar alla kommentarer för inlägget
    this.appService.getPostComments(_id)
    .subscribe(data =>this.comments=data);

    // Hämtar specifik kategori för inlägget
    this.appService.getCategory(_id)
    .subscribe(data =>this.category=data);
  }
}