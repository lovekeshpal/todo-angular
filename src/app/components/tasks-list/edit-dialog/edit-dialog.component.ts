import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TasksService} from "../../../services/tasks.service";
import {Task} from "../../../models/task.model";
import {FormControl, FormGroup} from "@angular/forms";


class DialogData {
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit{

  task: Task = {id: 0, date: "", taskName: "", status: ""};
  minDate = new Date();
  date: any = '';
  constructor(
    private taskService: TasksService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  editTask = new FormGroup({
    id: new FormControl(),
    date: new FormControl(),
    taskName: new FormControl(),
    status: new FormControl()
  })


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.task = this.taskService.getTaskForEdit(this.data);
    console.log(this.task.date + " task Values");
    this.editTask.controls['id'].setValue(this.task.id);
    this.editTask.controls['taskName'].setValue(this.task.taskName);
    this.editTask.controls['status'].setValue(this.task.status);
    this.editTask.controls['date'].setValue(this.task.date);
  }
  onSubmit(){
    this.taskService.updateTask(this.editTask.value);
    this.dialogRef.close();
  }

  //For allowing user to enter the numbers only
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 47 || charCode > 57));
  }


}
