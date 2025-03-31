import { Component, Input, SimpleChanges, OnChanges, computed, input, signal } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleComponent, CommonModule, FormsModule],
  template: `
    <div class="ui">
      <div class="row">
        <a href="javascript:void(0)" (click)="OrderDesc()">Sort Desc Title</a>
        <a href="javascript:void(0)" [ngStyle]="{'margin-left':'10px'}" (click)="OrderAsc()">Sort Asc Title</a>
      </div>
      <div class="row">
        <input type="text" 
          [value]="filterTitle()"
          (input)="onTitleInput($event)"
        />
      </div>
    </div>

    <div class="ui grid posts" [ngStyle]="{'margin-top':'10px'}">
      <div *ngFor="let article of visibleArticles()">
        <app-article [article]="article"></app-article>
      </div>
    </div>
  `
})
export class ArticleListComponent {

  constructor(private articleService: ArticleService){}

  filterTitle = signal('');

  onTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterTitle.set(input.value); // update the signal
  }

  visibleArticles = computed(() => {
    const articlesSig = this.articleService.articlesSig();
    const orderSig = this.articleService.orderSig();
    
    const filteredArticles = articlesSig.filter((article) =>
      article.title.toLowerCase().includes(this.filterTitle().toLowerCase())
    )

    // Sort the filtered articles based on the order (votes/asc/desc)
    return filteredArticles.sort((a, b) => {
      if (orderSig === 'asc')
        return a.votes - b.votes; // Ascending order
      else
        return b.votes - a.votes; // Descending order
    });

  });

  OrderDesc() {
    this.articleService.setSortingOrder('desc');
  }

  OrderAsc() {
    this.articleService.setSortingOrder('asc');
  }
}
