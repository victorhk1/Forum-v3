import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Category } from '../appClasses';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  categories: Category[];
  category: Category;

  name: String = '';
  description: String = '';

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar data för alla kategorier
    this.appService.getCategories()
    .subscribe(data =>this.categories=data);
  }

  // Hämtar data för att skapa ny kategori
  createCategory(category){
    let payload = {
      name: this.name,
      description: this.description
    }
    this.appService.createCategory(payload);
    window.location.reload();
  }

  // Hämtar data för att uppdatera kategori
  updateCategory(category){
    this.appService.updateCategory(category);
    window.location.reload();
  }

  // Hämtar ID för att radera kategori
  deleteCategory(category){
    this.appService.deleteCategory(category);
    window.location.reload();
  }
}
