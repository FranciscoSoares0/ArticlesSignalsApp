import { Component, EventEmitter, output, Output } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-form',
  imports: [],
  template: `
    <form class="ui large form segment" (submit)="handleAddArticleSubmit(titleElement, linkElement)">
        <h3 class="ui header">Add a Link</h3>

        <div class="field">
            <label for="title">Title:</label>
            <input type="text" id="title" #titleElement>
        </div>
        <div class="field">
            <label for="link">Link:</label>
            <input type="text" id="link" #linkElement>
        </div>

        @if (errorMessage !== '') {
            <p class="error-message">{{ errorMessage }}</p>
        }

        <button class="ui positive right floated button">
            Submit link
        </button>
    </form>
  `,
  styles: [`
      .error-message {
        color: tomato;
      }  
  `],
})
export class ArticleFormComponent {

  constructor(private articleService: ArticleService){}

  errorMessage = '';

  handleAddArticleSubmit(title: HTMLInputElement, link: HTMLInputElement) {
    if (!this.validate(title, link)) {
      return false;
    }

    this.articleService.addArticle(title.value, link.value)

    this.reset(title, link);

    return false;
  }

  private validate(title: HTMLInputElement, link: HTMLInputElement) {
    if (title.value.trim() === '' || link.value.trim() === '') {
      this.errorMessage = 'Title and link are required!';
      return false;
    }

    return true;
  }

  private reset(title: HTMLInputElement, link: HTMLInputElement) {
    this.errorMessage = '';
    title.value = '';
    link.value = '';
    title.focus();
  }
}
