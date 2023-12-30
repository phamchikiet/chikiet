import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CauhinhService } from './cauhinh.service';
import { tap, filter, first } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cauhinh',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './cauhinh.component.html',
  styleUrls: ['./cauhinh.component.css']
})
export class CauhinhComponent implements OnInit {
  _HoadonbanraService: CauhinhService = inject(CauhinhService);
  ListBanra: any[] = []
  ListState: any[] = []
  ListSHD: any[] = []
  ListHD: any[] = []
  Thang: any
  State: any
  Soluong: any
  TokenT1:any[]=['004d001040416f5277364a57652f3455445156516c50774a62…df07fffffcd00324d97a8111d271baeb7005de18c6f730042', '004d001040416f5277364975723449554451564d6950774a62…bf07fffff9b007c2795c8a08189f34f79a7be5959d8020042', '004d001040416f527736497572344955445156456650774a62…9f07fffff6900b575a17a91db6a03b3998aaf59a2ec0b0042', '004d001040416f5277714d44683359554451564d6350774a62…7f07fffff370096292f3afae5387a9a0dd1f422c77d820042', '004d001040416f5277365053583234554451564d5a50774a62…5f07fffff0500a6f9fc45fc8c3e056f59901488f877b80042', '004d001040416f5277714b6e4f3249554451564d5750774a62…3f07ffffed300097cce410394043909812feb189571d00042', '004d001040416f5277364e3245316f55445156495450774a62…1f07ffffea1000cd779a31a8f741dc6c02720eea750b30042', '004d001040416f5277714a4b37303455445156495150774a62…ff07ffffe6f002a3d5601d694e427d82837308361b8d50042', '004d001040416f52777150756e7a6f55445156514e50774a62…df07ffffe3d00c569bfac29b7c5258d40cef81ae0f1ee0042', '004d001040416f5277714f53557959554451564d4b50774a62…bf07ffffe0b0099f8ffa7ea347e38fa65cb4ea7a8d8b40042', '004d001040416f5277364a6a4c786f554451564d4850774a62…9f07ffffdd900ece70e8aa9683fd78f88819e0b88ecde0042', '004d001040416f527736494734775955445156554550774662…7f07ffffda700c71e5728f9935630371ad89ff23abab90042', '004d001040416f5277364f716b764955445156594250774662…5f07ffffd7500e0461bc4da08e50bfec3bdf398d97e490042']
  constructor() { }
  ngOnInit() {
    // this._HoadonbanraService.getAll().then((data: any) => {
    //     if (data) {
    //       console.log(data);   
    //       const SHD = data.map((v:any)=>(v.Dulieu.shdon))
    //       //console.log(SHD); 
    //   }
    // })
  }
  LoadListBanra() {
    // this._HoadonbanraService.getListBanra(this.Thang, this.State)
    // this._HoadonbanraService.banras$.pipe(
    //   tap(data => console.log(data)),
    //   filter(data => !!data),
    //   first()
    // ).subscribe((data: any) => {
    //   console.log(data.datas.map((v:any)=>{v.SHD}));
      
    //   this.ListHD = data.datas
    //   this.State = data.state
    //   const isDup = this.ListState.find((v)=>v==data.state)
    //   if(!isDup)
    //   {
    //     this.ListState.push(data.state)
    //   }
    //   this.Soluong = Number((data.total/50).toFixed(0))+1
    // });    
  }
  SaveSHD()
  {
   const List = this.ListHD.map((v:any)=>(v.shdon))
    console.log(List);
    List.forEach(v => {
      this.ListSHD.push(v)
      // const SHD =  this.ListSHD.find((v1:any)=>v1 === v)
      // if(!SHD)
      // {
      //  this.ListSHD.push(v)
      // }
   });
   console.log(this.ListSHD);

  //   this.ListSHD.forEach(v => {
  //     const SHD =  this.ListHD.find((v1:any)=>v1.shdon !== v)
  //     if(SHD)
  //     {
  //      this.ListSHD.push(SHD)
  //     }
  //  });
  }

}
