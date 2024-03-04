import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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
  @ViewChild('exportPDF') exportPDF!: ElementRef;
  @ViewChild('printArea') printArea!: ElementRef;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.Donhang);
    console.log(this.Tongthucte);

  }
  CloseAll() {
    this.dialog.closeAll()
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
    const printContents = this.printArea.nativeElement.innerHTML;
    const popupWin = window.open('', '_blank', 'width=600,height=400');
    popupWin?.document.open();
    popupWin?.document.write(`<html><head><title>Print Content</title></head><body>${printContents}</body></html>`);
    popupWin?.document.close();
    popupWin?.focus();
    popupWin?.print();
    popupWin?.close();
  }

}
