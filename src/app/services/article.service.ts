import { Injectable, signal } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articlesSig = signal<Article[]>([]);
  orderSig = signal<'votes' | 'desc' | 'asc'>('votes');

  addArticle(title: string,link:string): void {
    const newArticle = new Article(title, link);
    this.articlesSig.update((articles) => [...articles, newArticle]);
  }

  // Increment votes for a specific article by index
  upvoteArticle(article: Article): void {
    article.addVote();
    this.articlesSig.update((articles) => [...articles]);  // Trigger signal update
  }

  // Decrement votes for a specific article by index
  downvoteArticle(article: Article): void {
    article.removeVote();
    this.articlesSig.update((articles) => [...articles]);  // Trigger signal update
  }

  // Sorting order setter (either 'votes', 'asc', or 'desc')
  setSortingOrder(order: 'votes' | 'asc' | 'desc'): void {
    this.orderSig.set(order);
  }

}
