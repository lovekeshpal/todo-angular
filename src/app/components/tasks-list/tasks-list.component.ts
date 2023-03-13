import {Component, OnInit} from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {Task} from "../../models/task.model";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit{

  constructor(private tasksService: TasksService, public dialog: MatDialog) {
  }
  tasks: Task[] = [];
  ngOnInit(): void {
    this.tasks = this.tasksService.getTask();
  }


  deleteTask(id: number){
    this.tasksService.deleteTask(id);
    this.tasks = this.tasksService.getTask();

  }

  openDialog(id: any): void {
    this.dialog.open(EditDialogComponent,
      {data: id}
    );

  }



}
