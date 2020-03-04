import { Component, OnInit } from '@angular/core';
import { CsvService } from './csv.service';

declare var $:any;
@Component({
  selector: 'import-data-compoint',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  file:any;

  danger:boolean
  success:boolean
  errString:string
  constructor(private csv:CsvService) { }

  ngOnInit(): void {
    this.danger = false;
    this.success = false;
    this.errString="";  
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
          this.errString="New changes are submitted successfuly. You can check it on home panel."
          this.success=true;
          this.danger=false;
          console.log(res);
        },
        err =>
        {
          this.errString="Server is'nt reponding while reflecting changes."
          this.success=false;
          this.danger=true;
          console.log(err);
        } 

      )
    }
  }
}
