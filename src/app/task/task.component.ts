import { Component, OnInit } from '@angular/core';
import { TaskService } from '../component/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private task : TaskService) { }

  ngOnInit(): void {
  }
  release() {

  }
  assignToSelf() {

  }
  assignToOthers() {

  }
  submit_assigned_task()
  {
    
  }

}
