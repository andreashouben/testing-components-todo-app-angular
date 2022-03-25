import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todoForm = this.formBuilder.group({
    todo: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(form: HTMLFormElement) {
    console.log(form);
  }
}
