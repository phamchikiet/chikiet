import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CauhinhService {
  private _cauhinhs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _cauhinh: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get cauhinhs$(): Observable<any[] | null> {
    return this._cauhinhs.asObservable();
  }
  get cauhinh$(): Observable<any | null> {
    return this._cauhinh.asObservable();
  }
  constructor() {}

  async getListBanra() {
    const headers = new Headers({ Authorization: environment.Token });
    const response = await fetch("https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&search=tdlap=ge=01/11/2023T00:00:00;tdlap=le=31/11/2023T23:59:59", {
      method: "GET",
      headers,
    });
    const result = await response.json();
    console.log(result);
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
