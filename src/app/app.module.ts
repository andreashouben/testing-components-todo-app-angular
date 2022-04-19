import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { TypTrash } from '@ng-icons/typicons';
import { HttpClientModule } from '@angular/common/http';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [AppComponent, TodoItemComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({ TypTrash }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
