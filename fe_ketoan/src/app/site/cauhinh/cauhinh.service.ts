import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CauhinhService {
  private _cauhinhs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _cauhinh: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _banras: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _banra: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get banras$(): Observable<any[] | null> {
    return this._banras.asObservable();
  }
  get banra$(): Observable<any | null> {
    return this._banra.asObservable();
  }
  get cauhinhs$(): Observable<any[] | null> {
    return this._cauhinhs.asObservable();
  }
  get cauhinh$(): Observable<any | null> {
    return this._cauhinh.asObservable();
  }
  constructor() {}
  async FindHoadon(thang: any,nam: any,ttxly:any,SHD: any) {
    const options = {
      method:'GET',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1OTAwNDI4OTA0IiwidHlwZSI6MiwiZXhwIjoxNzAzOTUzMTgwLCJpYXQiOjE3MDM4NjY3ODB9.vm9TXbCODMYQ2hnP9IU7ijBu0Ix6g_UMHjA87NpI-n0AjgP6BvW1TzTFFoAoTS_v-dJouQiyRkFAl6VJgqWCbg', 
        'Cookie': 'TS01c977ee=01dc12c85ef57e57577a543b75785a82e872e80dfb3942c85ff710abde2b37795e60bde54ad2c48c66e1fcfc2de28d89192e6fa886'
      }
    };
    const URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/purchase?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=15&search=tdlap=ge=01/${thang}/${nam}T00:00:00;tdlap=le=31/${thang}/${nam}T22:59:59;ttxly==${ttxly};shdon==${SHD}`
    const response = await fetch(URL, options);
    const result = await response.json();
    const data = result.datas.map((v: any) => ({thang:thang,nam:nam, nbmst: v.nbmst, khhdon: v.khhdon, shdon: v.shdon,tdlap:new Date(v.tdlap) }))
    data.forEach((v:any) => {
      this.createData(v)
    });
  }
  async FindChitietHoadon(nbmst: any,khhdon: any,shdon: any,loai:any,thang:any,nam:any) {
    const options = {
      method:'GET',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1OTAwNDI4OTA0IiwidHlwZSI6MiwiZXhwIjoxNzAzOTUzMTgwLCJpYXQiOjE3MDM4NjY3ODB9.vm9TXbCODMYQ2hnP9IU7ijBu0Ix6g_UMHjA87NpI-n0AjgP6BvW1TzTFFoAoTS_v-dJouQiyRkFAl6VJgqWCbg', 
        'Cookie': 'TS01c977ee=01dc12c85ef57e57577a543b75785a82e872e80dfb3942c85ff710abde2b37795e60bde54ad2c48c66e1fcfc2de28d89192e6fa886'
      }
    };
    const URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/detail?nbmst=${nbmst}&khhdon=${khhdon}&shdon=${shdon}&khmshdon=1`
    const response = await fetch(URL, options);
    const result = await response.json();
    const item = result.hdhhdvu?.map((v:any)=>({idChitiet:v.id,thang:thang,nam:nam,Ngay:new Date(result.tdlap),ten:v.ten,shdon:shdon,sluong:v.sluong,dgia:v.dgia,thtien:v.thtien,Loai:loai}))
    return item
  }
  async createData(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/sohoadon`, options);
          const result = await response.json();
          console.log(item.shdon,result);
          
      } catch (error) {
          return console.error(error);
      }
  }  
  async getHoadon(thang:any) {
    try {
          const response = await fetch(`${environment.APIURL}/sohoadon/sltheothang/${thang}`);
          const data = await response.json();      
          console.log(data);
            
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
}
