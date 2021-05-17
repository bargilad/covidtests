import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { CardComponent } from './cards-container/card/card.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CardActionsComponent } from './cards-container/card/card-actions/card-actions.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CardsContainerComponent,
    CardComponent,
    NavigationBarComponent,
    CardActionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule
  ],
  providers: [{provide: 'ENV', useValue: environment},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
