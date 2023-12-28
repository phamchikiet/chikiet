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

  async getListBanra(thang:any,state:any) {
    const headers = new Headers({ Authorization: environment.Token });
    let URL:any;
    if(state)
    {
      URL = "https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&state="+state+"&search=tdlap=ge=01/"+thang+"/2023T00:00:00;tdlap=le=31/"+thang+"/2023T23:59:59"
    }
    else{
      URL = "https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&search=tdlap=ge=01/"+thang+"/2023T00:00:00;tdlap=le=31/"+thang+"/2023T23:59:59"
    }
    const response = await fetch(URL, {
      method: "GET",
      headers,
    });
    const result = await response.json();
    this._banras.next(result)
    return result
  }
  async getListMuavao(thang:any,state:any) {
    const headers = new Headers({ Authorization: environment.Token });
    let URL:any;
    if(state)
    {
      URL = "https://hoadondientu.gdt.gov.vn:30000/query/invoices/purchase?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&state="+state+"&search=tdlap=ge=01/"+thang+"/2023T00:00:00;tdlap=le=31/"+thang+"/2023T23:59:59;tthai==1;ttxly==5"
    }
    else{
      URL = "https://hoadondientu.gdt.gov.vn:30000/query/invoices/purchase?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&search=tdlap=ge=01/"+thang+"/2023T00:00:00;tdlap=le=31/"+thang+"/2023T23:59:59;tthai==1;ttxly==5"
    }
    const response = await fetch(URL, {
      method: "GET",
      headers,
    });
    const result = await response.json();
    this._banras.next(result)
    return result
  }
  async getAll() {
    try {
          const response = await fetch(environment.APIURL + '/muavaochitiet');
          const data = await response.json();        
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  // getAllCauhinhs() {
  //   return this.http.get(environment.APIURL + '/cauhinh').pipe(
  //     map((data: any) => { 
  //       this._cauhinhs.next(data);
  //       return data;
  //     })
  //   );
  // }
  // searchCauhinh(query:any) {
  //   return this.http.get(environment.APIURL + `/cauhinh/search?query=${query}`).pipe(
  //     map((data: any) => { 
  //       return data;
  //     })
  //   );
  // }
  // getCauhinhBySlug(slug: string) {
  //   return this.http.get(environment.APIURL + `/cauhinh/findslug/${slug}`).pipe(
  //     map((data: any) => {
  //       this._cauhinh.next(data);
  //       return data;
  //     })
  //   );
  // }
  // getPaginaCauhinhs(page: number, limit: number) {
  //   const params ={ page: String(page), limit: String(limit) }
  //   return this.http.get(environment.APIURL+'/cauhinh/pagina',{ params }).pipe(
  //     map((data: any) => {
  //       return data;
  //     })
  //   );
  // }
  // getCauhinhById(id: string) {
  //   return this.http.get(environment.APIURL + `/cauhinh/findid/${id}`).pipe(
  //     map((data: any) => {
  //       this._cauhinh.next(data);
  //       return data;
  //     })
  //   );
  // }
  // CreateCauhinh(data: any) {
  //   return this.cauhinhs$.pipe(
  //     take(1),
  //     switchMap((cauhinhs: any) =>
  //       this.http.post(environment.APIURL + '/cauhinh', data).pipe(
  //         map((cauhinh) => {
  //           if (cauhinhs?.length > 0) {
  //             this._cauhinhs.next([...cauhinhs, cauhinh]);
  //           }
  //           return cauhinh;
  //         })
  //       )
  //     )
  //   );
  // }
  // UpdateCauhinh(data: any) {
  //   return this.cauhinhs$.pipe(
  //     take(1),
  //     switchMap((cauhinhs: any) =>
  //       this.http.patch(environment.APIURL + `/cauhinh/${data.id}`, data).pipe(
  //         map((cauhinh) => {
  //           const index = cauhinhs.findIndex((item: any) => item.id === data.id);
  //           if (index != -1) {
  //             cauhinhs[index] = data;
  //             this._cauhinhs.next(cauhinhs as any[]);
  //           } else {
  //             this._cauhinhs.next([cauhinh]);

  //           }
  //           return cauhinh;
  //         })
  //       )
  //     )
  //   );
  // }
  // DeleteCauhinh(id: string) {
  //   return this.cauhinhs$.pipe(
  //     take(1),
  //     switchMap((cauhinhs: any) =>
  //       this.http.delete(environment.APIURL + `/cauhinh/${id}`).pipe(
  //         map((isDelete) => {
  //           const updateCauhinh = cauhinhs.filter((e: any) => e.id != id);
  //           this._cauhinhs.next(updateCauhinh);
  //           return isDelete;
  //         })
  //       )
  //     )
  //   );
  // }
}
