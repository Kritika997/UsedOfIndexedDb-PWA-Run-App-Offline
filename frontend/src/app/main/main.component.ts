import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TodoService } from "../todo.service";

import { Router, ActivatedRoute, Route } from "@angular/router";
import { Subscription } from 'rxjs';
import { store } from '@angular/core/src/render3';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {

  public todos;
  public todoSubscription: Subscription;
  public dbase: any;

  constructor(private todoService: TodoService, private router: Router,) {
    
  }

  public todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),

  });

  addTodo(formData: FormData) {
    console.log("DATA")
    this.todoService.addTodo(formData);
    this.todoForm.reset();
  }


  getdata(){
    this.todoService.getItemsFromIndexedDb().
      then((value) => {
        this.dbase = value
        console.log(this.dbase, "////////////")
      }).
      catch((err) => {
        console.log(err.message)
      })

  }
  
  getTodos() {
    this.todoSubscription = this.todoService.getAllTodos().subscribe(todos => {
      this.todos = todos["data"];
    });
  }

  delete(todoId: string) {

    this.todoService.deleteTodo(todoId)
  }
  ngOnInit() {
    this.getdata();
    this.getTodos();
  }

  ngOnDestroy() {

    if (this.todoSubscription !== undefined) {
      this.todoSubscription.unsubscribe()
    }

  }



}
