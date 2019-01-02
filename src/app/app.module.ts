import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppService} from './app.service';

import { AppComponent } from './app.component';

import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { CreateComponent } from './create/create.component';
import { CommentComponent } from './comment/comment.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

import { FilterSearchPipe } from './filter-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CategoryComponent,
    CreateComponent,
    CommentComponent,
    DiscussionComponent,
    EditComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    SignupComponent,
    UserComponent,       
    FilterSearchPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
