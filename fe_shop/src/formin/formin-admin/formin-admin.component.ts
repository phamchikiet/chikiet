import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { GiohangService } from 'fe_shop/src/app/admin/main-admin/website/giohang/giohang.service';
@Component({
  selector: 'app-formin-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formin-admin.component.html',
  styleUrls: ['./formin-admin.component.css']
})
export class ForminAdminComponent implements OnInit {
  @Input() Donhang: any = {}
  @Input() Tongthucte: any = 0
  @Input() Taikhoan: any = { STK: '9199217', TenTK: "TRAN HUU LANH", TenNH: "Ngân hàng TMCP Á Châu (ACB)" }
  @Input() isShowAction: boolean = false
  @Input() Type:any='KHACHHANG'
  @ViewChild('exportPDF') exportPDF!: ElementRef;
  @ViewChild('printArea') printArea!: ElementRef;
  _GiohangService:GiohangService = inject(GiohangService)
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.Donhang);
  }
  CloseAll() {
    this.dialog.closeAll()
  }
  GetSubTotal(data: any, field: any, field1: any) {    
    return this._GiohangService.getSum(data,field,field1)
  }
  GetSubTotalThucte(data: any, field: any, field1: any) {    
    const items = data.map((v:any)=>(v.Giachon))    
    return this._GiohangService.getSumThucte(items,field,field1)
  }
  GetTotalThucte(donhang:any,giohang:any,soluong:any,gia:any,thue:any)
  {    
    const result = (this.GetSubTotalThucte(giohang, soluong, gia) + Number(donhang.Vanchuyen.Phivanchuyen||0) + Number(donhang.Giamgia||0) + this.GetSubTotal(giohang, thue, ''))
    return result
  }
  
  public convetToPDF() {
    const element = this.exportPDF.nativeElement as HTMLElement;
    html2canvas(element).then(canvas => {
      var imgWidth = 148;
      var pageHeight = 210;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(`${this.Donhang.MaDonHang}_${(new Date()).getTime()}.pdf`); // Generated PDF
    }); 
  }
  printDiv() {
    const printArea = this.printArea.nativeElement;
    console.log(printArea);
    const originalStyles = printArea.style.display;
    printArea.style.display = 'flex'; // Ensure visibility for printing
    printArea.style.margin = '0'; // Remove margins for full-page coverage
    printArea.style.padding = '0'; // Remove padding for full-page coverage
    window.print();
    printArea.style.display = originalStyles; // Restore original styles
  }

}
