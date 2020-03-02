import { Component, OnInit } from '@angular/core';
import { CsvService } from './csv.service'
@Component({
  selector: 'import-data-compoint',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  file:any;
  constructor(private csv:CsvService) { }

  ngOnInit(): void {

  }


  postMethod(files: FileList)
  {
    this.file = files.item(0);
    console.log(this.file)
  }
  renderToStore()
  {
    let formData = new FormData(); 
    if(this.file!=null)
    {
      console.log("trying to send file")
      formData.append('file', this.file, this.file.name);
      this.csv.csvSend(formData).subscribe(
        (res)=>{
          console.log(res);
        },
        err => console.log(err)
      )
    }
  }
}
