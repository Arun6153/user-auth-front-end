import { Component, OnInit } from '@angular/core';
import { TaskService } from '../component/task.service';
import { ListService } from '../list-users/list.service';

declare var $: any;
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any;
  selectedTask: any;
  users: any;
  selectedOp: any;
  constructor(private task: TaskService, private list: ListService) { }

  ngOnInit(): void {
    this.selectedTask = { "id": "" };
    this.users = [{ "name": "", "userid": "", "id": "" },]
    this.contentToLoad();
  }

  contentToLoad() {
    //// table content
    this.task.GetListOfTasks().subscribe(
      (res) => {
        this.tasks = res.data
      },
      (err) => console.log(err)
    );

    //// users for select tag
    this.list.list().subscribe(
      (res) => {
        this.users = res.data;
        console.log(this.users)
      },
      err => {
        console.log(err.error)
      }
    );
  }
  placeHolder(id) {
    console.log(id);
    this.tasks.forEach(task => {
      if (task.id == id)
        this.selectedTask = task;
    });
  }
  release() {

  }
  assignToSelf() {

  }
  assignToOthers() {
  }
  submit_assigned_task() {
    console.log(this.selectedOp);
  }
  maintainArray(i,id)
  {
    console.log(i+" "+id)
  }
}
// onCheckboxChange(option, event) {
//   if(event.target.checked) {
//     this.checkedList.push(option.id);
//   } else {
//   for(var i=0 ; i < this.xyzlist.length; i++) {
//     if(this.checkedList[i] == option.id) {
//       this.checkedList.splice(i,1);
//    }
//  }
// }
// console.log(this.checkedList);
// }