import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import 'semantic-ui-css/semantic.css';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
  
