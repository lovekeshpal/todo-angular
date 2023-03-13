import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent{
  // For minimum date
  minDate = new Date();
  date: any = '';

  //Form controls
  addTask = new FormGroup({
    id: new FormControl(),
    date: new FormControl('',Validators.required),
    taskName: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required)
  })

  // Function for generating unique ID
  uniqueID() {
    return Math.floor(Math.random() * Date.now())
  }

  constructor(private tasksService: TasksService) {
  }

  checkForm(){
    return (this.addTask.controls['date'].value && this.addTask.controls['taskName'].value && this.addTask.controls['status'].value);
  }

  onSubmit(){
    //adding an Unique ID
    this.addTask.controls['id'].setValue(this.uniqueID());
    //get the date in required format
    this.date = this.addTask.controls['date'].value;
    this.addTask.controls['date'].setValue(this.date);
    //adding the task to Tasks Array in taskService
    this.tasksService.setTask(this.addTask.value);
    //reset the form after submission without showing validation errors
    this.addTask.reset()
    Object.keys(this.addTask.controls).forEach((key) => {
      // @ts-ignore
      const control = this.addTask.controls[key];
      control.setErrors(null);
    });

  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 47 || charCode > 57));
  }




}
