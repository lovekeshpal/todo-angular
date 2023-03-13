import { Injectable } from '@angular/core';
import {Task} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];

  setTask(task: any){

    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));


  }
  getTask(){
   this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
   console.log(this.tasks);
    return  this.tasks;
  }

  deleteTask(id: number){
    this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    this.tasks = this.tasks.filter(e => e.id != id);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getTaskForEdit(id: any){

    return this.tasks.find(task => task.id == id);
  }
  index: number = 0;
  updateTask(updatedTask: any){
    this.index = this.tasks.findIndex(task => task.id == updatedTask.id);
    this.tasks[this.index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  constructor() { }
}
