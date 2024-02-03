import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-hinhanh',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  templateUrl: './hinhanh.component.html',
  styleUrls: ['./hinhanh.component.css']
})
export class HinhanhComponent implements OnInit {
  @Input() Image:any={};
  @Output() UploadEmit = new EventEmitter();
  _UploadService:UploadService = inject(UploadService)
  constructor() { }
  ngOnInit() {
   this.Image.src=this.Image?.Main
    console.log(this.Image);
  }
  async onSelect(event: any) {    
    const result = await this._UploadService.uploadDriver(event.addedFiles[0])
    this.Image = result
    this.UploadEmit.emit(this.Image);
  }
  async onRemove(data: any) {
    const result =  this._UploadService.DeleteuploadDriver(data)    
    this.Image = {}
    this.UploadEmit.emit(this.Image);
  }
}
