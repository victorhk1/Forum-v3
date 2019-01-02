import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {AppService} from '../app.service';
import { Post } from '../appClasses'; 

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  post: Post;

  content: String = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar inläggs-ID från adressfält
    let _id = this.route.snapshot.paramMap.get('_id');

    // Hämtar specifikt inlägg som stämmer överens med ID
    this.appService.getPost(_id)
    .subscribe(data => this.post=data);
  }

  // Paketerar data för ny kommentar och skickar till service
  createComment(id){
    let payload = {
      postId: id,
      content: this.content,
      user: "5bed67d5ebc59d0c74bd67de" // TA BORT EFTER SESSION, KOPPLA TILL RÄTT ANVÄNDARE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    this.appService.createPost(payload);
    // Publicerar kommentar och skickar användaren tillbaka till inlägget som kommenterats
    window.location.reload();
    this.router.navigate(['post/' + id]);
  }

  // "Cancel"-knapp skickar användaren tillbaka till föregående vy
  goBack(){
    this.location.back();
  }
}
