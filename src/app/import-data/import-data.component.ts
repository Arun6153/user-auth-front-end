import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { HomeLayoutComponent } from '../home-layout/home-layout.component';

@Component({
  selector: 'import-data-compoint',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  renderToStore()
  {
    
  }
}
