import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {AppService} from '../app.service';
import { Category } from '../appClasses';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  category: Category;
  title: String = '';
  content: String = '';
  user: String = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar kategori-ID från adressfält
    let _id = this.route.snapshot.paramMap.get('_id');

    // Hämtar kategori stämmer överens med ID:t
    this.appService.getCategory(_id)
    .subscribe(data =>this.category=data);
  }

  // Paketerar data för nytt inlägg och skickar till service
  createPost(){
    let payload = {
      "category": this.category,
      "title": this.title,
      "content": this.content
    }
    this.appService.createPost(payload);
    // Publicerar kommentar och skickar användaren tillbaka till inlägget som kommenterats
    window.location.reload();
    this.router.navigate(['category/' + this.category._id]);
  }

  // "Cancel"-knapp skickar användaren tillbaka till föregående vy
  goBack(){
    this.location.back();
  }

}
