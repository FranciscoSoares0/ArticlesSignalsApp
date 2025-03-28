import { Component, HostBinding, input, Input } from '@angular/core';
import { Article } from '../../models/article';
import { JsonPipe } from '@angular/common';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  template: `
    <div class="four wide column center aligned votes">
      <div class="ui statistic">
        <div class="value">{{ article()?.votes }}</div>
        <div class="label">Points</div>
      </div>
    </div>

    <div class="twelve wide column">
      <a [href]="article()?.link" target="_blank" class="ui large header">{{ article()?.title }}</a>
      <div class="meta">({{ article()?.domain() }})</div>

      <div class="ui big horizontal list voters">
        <a href="javascript:void(0)" (click)="handleUpVoteClick()">
          <i class="arrow up icon"></i>
          upvote
        </a>
        <a href="javascript:void(0)" (click)="handleDownVoteClick()">
          <i class="arrow down icon"></i>
          downvote
        </a>
      </div>
    </div>

    <!-- <pre>{{ article | json }}</pre> -->
  `,
  // imports: [JsonPipe]
})
export class ArticleComponent {

  @HostBinding('attr.class')
  hostCssClass = 'row';

  constructor(private articleService : ArticleService){}

  article = input<Article>();

  handleUpVoteClick() {
    this.articleService.upvoteArticle(this.article()!)
    this.articleService.setSortingOrder('votes');
  }

  handleDownVoteClick() {
    this.articleService.downvoteArticle(this.article()!)
    this.articleService.setSortingOrder('votes');
  }
}
