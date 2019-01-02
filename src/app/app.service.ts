import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import{User} from './appClasses';
import{ Category } from './appClasses';
import{ Post } from './appClasses';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // URL för API:t
  apiUrl = "/api";

  category: Category;

  constructor(
    private http: HttpClient
  ) { }

  

  /***** HTTP GET *****/
  // Hämtar alla användare
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+"/users", {withCredentials: true});
  }

  // Hämtar specifik användare
  getUser(id): Observable<User>{
    return this.http.get<User>(this.apiUrl+"/user/"+id, {withCredentials: true});
  }

  // Hämtar alla kategorier
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl+"/categories", {withCredentials: true});
  }

  // Hämtar specifik kategori
  getCategory(id): Observable<Category>{
    return this.http.get<Category>(this.apiUrl + "/category/"+id, {withCredentials: true});
  }

  // Hämtar alla poster
  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl + "/posts", {withCredentials: true});
  }

  // Hämtar alla poster inom kategori
  getPosts(category): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl + "/"+category+"/posts", {withCredentials: true});
  }

  // Hämtar specifikt inlägg/kommentar
  getPost(id): Observable<Post>{
    return this.http.get<Post>(this.apiUrl + "/posts/"+id, {withCredentials: true});
  }

  // Hämtar specifikt inläggs kommentarer
  getPostComments(id: String): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl+"/posts/"+id+"/comments", {withCredentials: true});
  }
  
  /***** HTTP POST *****/
  // Skapar nytt inlägg
  createPost(payload){
      this.http.post(this.apiUrl+"/post", payload, {withCredentials: true,responseType: 'text'}).subscribe(res => {console.log(res);});
  }

  // Skapar ny kommentar
  createComment(payload){
    this.http.post(this.apiUrl+"/comment", payload, {withCredentials: true,responseType: 'text'}).subscribe(response => {});
  }

  // Skapar ny kategori
  createCategory(payload){
    this.http.post(this.apiUrl+"/category", payload, {withCredentials: true,responseType: 'text'}).subscribe(response => {});
  }
  //Skapar ny användare
  createNewUser(payload){
    this.http.post(this.apiUrl+"/user", payload, {withCredentials: true,responseType: 'text'}).subscribe(response => {});
  }

  /***** HTTP PUT *****/
  // Uppdaterar inlägg/kommentar
  updatePost(post: Post){
    // Använd paketerad data som skickats med
    let payload = {
      "id": post._id,
      "title": post.title,
      "content": post.content
    }
    this.http.put(this.apiUrl+"/post/"+ post._id, payload, {responseType: 'text'}).subscribe(response => {});
  }

  // Uppdaterar kategori
  updateCategory(category: Category){
    // Använd paketerad data som skickats med
    let payload = {
      "id": category._id,
      "name": category.name,
      "description": category.description
    }
    this.http.put(this.apiUrl+"/category/"+ category._id, payload, {withCredentials: true,responseType: 'text'}).subscribe(response => {});
  }

  // Updaterar användare
  updateUser(user: User){
    // Använd paketerad data som skickats med
    let payload = {
      "id": user._id,
      "mail": user.mail
    }
    this.http.put(this.apiUrl+"/user/"+ user._id, payload, {withCredentials: true,responseType: 'text'}).subscribe(response => {});
  }

  /***** HTTP DELETE *****/
  // Raderar inlägg/kommentar
  deletePost(payload){
    this.http.delete(this.apiUrl+"/post/"+ payload._id, {withCredentials: true,responseType: 'text'}).subscribe(response => {});
  }

  // Raderar kategori
  deleteCategory(category: Category){
    this.http.delete(this.apiUrl+"/category/"+ category._id, {withCredentials: true,responseType: 'text'}).subscribe(response => {});
  }

  //LOGIN SERVICE
  login(payload){
    this.http.post(this.apiUrl+"/login",payload, {withCredentials: true, responseType: 'text'}).subscribe(res => {console.log(res);});
  }
  //LOGOUT
  logout(){
    this.http.post(this.apiUrl+"/logout", {withCredentials: true}).subscribe(res => {console.log(res);});
  }
}