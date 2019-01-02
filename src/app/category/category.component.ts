import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../app.service';
import { Post } from '../appClasses';
import { Category } from '../appClasses';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  posts: Post[];
  category: Category;
  
  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar kategori-ID från adressfält
    let _id = this.route.snapshot.paramMap.get('_id');

    // Hämtar alla poster som stämmer överens med kategori-ID
    this.appService.getPosts(_id)
    .subscribe(data =>this.posts=data);

    // Hämtar alla kategorier
    this.appService.getCategory(_id)
    .subscribe(data =>this.category=data);
  }

}
