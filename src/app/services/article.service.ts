import { Injectable, signal } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articlesSig = signal<Article[]>([]);
  orderSig = signal<'desc' | 'asc'>('desc');

  addArticle(title: string,link:string): void {
    const newArticle = new Article(title, link);
    this.articlesSig.update((articles) => [...articles, newArticle]);
  }

  upvoteArticle(article: Article): void {
    this.articlesSig.update((articles) =>
      articles.map(a =>{
        if(a.id === article.id){
          a.votes ++;
        }
        return a
      })
    );
  }
  
  downvoteArticle(article: Article): void {
    this.articlesSig.update((articles) =>
      articles.map(a =>{
        if(a.id === article.id){
          a.votes --;
        }
        return a
      })
    );
  }

  // Sorting order setter (either 'votes', 'asc', or 'desc')
  setSortingOrder(order: 'asc' | 'desc'): void {
    this.orderSig.set(order);
  }

}
