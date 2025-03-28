import { Component } from '@angular/core';
import { ArticleComponent } from "./components/article/article.component";
import { Article } from './models/article';
import { HeaderComponent } from "./components/header/header.component";
import { ArticleFormComponent } from "./components/article-form/article-form.component";
import { ArticleListComponent } from "./components/article-list/article-list.component";
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header title="Voting App" />

    <div class="ui main text container">
        <app-article-form />
        <app-article-list />
    </div>
  `,
  imports: [HeaderComponent, ArticleFormComponent, ArticleListComponent]
})
export class AppComponent {


}
