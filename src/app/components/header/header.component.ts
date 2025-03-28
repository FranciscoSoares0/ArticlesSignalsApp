import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="ui menu">
      <div class="ui container">
          <div class="header item borderless">
              <h1 class="ui header">
                  {{ title() }}
              </h1>
          </div>
      </div>
  </div>
  `
})
export class HeaderComponent {
  title = input('Header title');
}
