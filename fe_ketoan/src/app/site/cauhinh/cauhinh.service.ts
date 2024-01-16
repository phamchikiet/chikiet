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
  Token:any = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1OTAwNDI4OTA0IiwidHlwZSI6MiwiZXhwIjoxNzA0MTE2MTA3LCJpYXQiOjE3MDQwMjk3MDd9.3arymZ9wqQLvRTPhtBWSOgTM7qPLRWY20eu5EsTjjRltXzfMUo_wybL2pV0kpXiZTBzmUiPvwdxNCH3uihDu6Q'
  constructor() {}
  async getAll() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/chitiet`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async FindHoadon(thangtim: any,thangluu: any,namtim: any,namluu: any,ttxly:any,SHD: any,Loai:any='NHAP') {
    const options = {
      method:'GET',
      headers: { 
        'Authorization': this.Token, 
      }
    };
    const URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/purchase?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&search=tdlap=ge=01/${thangtim}/${namtim}T00:00:00;tdlap=le=31/${thangtim}/${namtim}T23:59:59;ttxly==${ttxly};shdon==${SHD}`
    const response = await fetch(URL, options);
    const result = await response.json();
    const data = result.datas.map((v: any) => ({thang:thangluu,nam:namluu, nbmst: v.nbmst, khhdon: v.khhdon, shdon: v.shdon,tdlap:new Date(v.tdlap),Loai:Loai }))
    data.forEach((v:any) => {
      this.createData(v)
    });
  }
  async FindChitietHoadon(nbmst: any,khhdon: any,shdon: any,loai:any,thang:any,nam:any) {
    const options = {
      method:'GET',
      headers: { 
        'Authorization': this.Token, 
      }
    };
    const URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/detail?nbmst=${nbmst}&khhdon=${khhdon}&shdon=${shdon}&khmshdon=1`
    const response = await fetch(URL, options);
    const result = await response.json();
    const item = result.hdhhdvu?.map((v:any)=>({idChitiet:v.id,thang:thang,nam:nam,Ngay:new Date(result.tdlap),ten:v.ten,shdon:shdon,sluong:Number(v.sluong||0),dgia:Number(v.dgia||0),thtien:Number(v.thtien||0),Loai:loai}))
    if(item && item.length>0)
    {
      item.forEach((v:any) => {
        this.createChitiet(v)
      });
    }

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
          if(!result.hasOwnProperty('res'))
          {
            console.log(item.shdon,result);
          }
          
      } catch (error) {
          return console.error(error);
      }
  }  
  async getHoadon(thang:any,nam:any,Loai:any) {
    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({thang:thang,nam:nam,Loai:Loai}),
      };
          const response = await fetch(`${environment.APIURL}/sohoadon/sltheothang`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getListChitiet(thang:any,nam:any,Loai:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({thang:thang,nam:nam,Loai:Loai}),
      };
          const response = await fetch(`${environment.APIURL}/chitiet/findthang`,options);
          const data = await response.json();   
         console.log(data);               
          return data.items;
      } catch (error) {
          return console.error(error);
      }
  }
  async createChitiet(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/chitiet`, options);
          const result = await response.json();
          if(!result.hasOwnProperty('res'))
          {
            console.log(item.shdon,result);
          }
      } catch (error) {
          return console.error(error);
      }
  } 


  async FindBanra(thangtim: any,thangluu: any,namtim: any,namluu: any,SHD: any,Loai:any='XUAT') {
    const options = {
      method:'GET',
      headers: { 
        'Authorization': this.Token, 
      }
    };
    const URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=15&search=tdlap=ge=01/${thangtim}/${namtim}T00:00:00;tdlap=le=31/${thangtim}/${namtim}T23:59:59;shdon==${SHD}`
    const response = await fetch(URL, options);
    const result = await response.json();    
    const data = result.datas.map((v: any) => ({thang:thangluu,nam:namluu, nbmst: v.nbmst, khhdon: v.khhdon, shdon: v.shdon,tdlap:new Date(v.tdlap),Loai:Loai }))
    data.forEach((v:any) => {
      this.createData(v)
    });
  }
  async FindChitietBanra(nbmst: any,khhdon: any,shdon: any,loai:any,thang:any,nam:any) {
    const options = {
      method:'GET',
      headers: { 
        'Authorization': this.Token, 
      }
    };
    const URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/detail?nbmst=${nbmst}&khhdon=${khhdon}&shdon=${shdon}&khmshdon=1`
    const response = await fetch(URL, options);
    const result = await response.json();
    const item = result.hdhhdvu?.map((v:any)=>({idChitiet:v.id,thang:thang,nam:nam,Ngay:new Date(result.tdlap),ten:v.ten,shdon:shdon,sluong:Number(v.sluong||0),dgia:Number(v.dgia||0),thtien:Number(v.thtien||0),Loai:loai}))
    if(item && item.length>0)
    {
      item.forEach((v:any) => {
        this.createChitiet(v)
      });
    }

  }


}
