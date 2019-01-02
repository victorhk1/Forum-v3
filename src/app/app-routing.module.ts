import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { CreateComponent } from './create/create.component';
import { CommentComponent } from './comment/comment.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // startsida + hämtar alla kategorier
  { path: 'login', component: LoginComponent}, // logga in till webbit
  { path: 'signup', component: SignupComponent }, // registrera ny användare
  { path: 'category/:_id', component: CategoryComponent }, // hämtar alla inlägg inom viss kategori
  { path: 'category/:_id/create', component: CreateComponent }, // skapa nytt inlägg
  { path: 'post/:_id', component: DiscussionComponent }, // hämtar specifikt inlägg och dess kommentarer
  { path: 'post/:_id/comment', component: CommentComponent }, // skapa ny kommentar
  { path: 'post/:_id/edit', component: EditComponent }, // redigera inlägg/kommentar
  { path: 'user/:_id', component: UserComponent }, // hämtar användarprofil
  { path: 'search', component: SearchComponent }, // visar sökresultat
  { path: 'admin', component: AdminComponent }, // visar sökresultat
  { path: '**', redirectTo: '/' } // om route i addressfältet inte stämmer med någon ovan, skicka till startsidan
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
