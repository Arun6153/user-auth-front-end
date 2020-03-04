import { Component, OnInit } from '@angular/core';
import { CsvService } from './csv.service';

declare var $:any;
@Component({
  selector: 'import-data-compoint',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  // GOLBAL VARIABLES
  file:any;
  danger:boolean
  success:boolean
  errString:string
  isAdded:boolean
  fileName:string
  constructor(private csv:CsvService) { }

  ngOnInit(): void {
    this.danger = false;
    this.success = false;
    this.errString=""; 
    this.isAdded=false; 
  }

  // GETTING CSV
  postMethod(files: FileList)
  {
    this.file = files.item(0);
    if(this.file)
    {
      this.isAdded=true;
      this.fileName = this.file.name;
    }
    else
    {
      this.isAdded=false;
    }
    console.log(this.file);
  }

  // PROCESS TO SEND CSV TO THE SERVER
  renderToStore()
  {
    let formData = new FormData(); 
    if(this.file!=null)
    {
      this.isAdded=false;
      console.log("trying to send file")
      formData.append('file', this.file, this.file.name);
      this.csv.csvSend(formData).subscribe(
        (res)=>{
          this.errString="✔ New changes are submitted successfuly. You can check it on home panel."
          this.success=true;
          this.danger=false;
          console.log(res);
        },
        err =>
        {
          if(err.status==500)
          {
            document.getElementsByTagName("body")[0].innerHTML = "<h1>ERROR 500 - False Token</h1>";
          }
          this.errString="❌ Server is'nt reponding while reflecting changes."
          this.success=false;
          this.danger=true;
          console.log(err.error);
        } 

      )
    }
    else{
      alert("Import the file to reflect changes.")
    }
  }
}
