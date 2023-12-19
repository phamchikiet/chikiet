import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HoadonbanraService {
  private _hoadonbanras: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _hoadonbanra: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get hoadonbanras$(): Observable<any[] | null> {
    return this._hoadonbanras.asObservable();
  }
  get hoadonbanra$(): Observable<any | null> {
    return this._hoadonbanra.asObservable();
  }
  constructor() {}

  getAllHoadonbanras() {
    return fetch(environment.APIURL + '/banrachitiet/pagination?page=1&perPage=100')
    // return fetch(environment.APIURL + '/banrachitiet/pagination?page=1&perPage=100')
      .then(response => response.json())
      .then((data: any) => {
        this._hoadonbanras.next(data);
        return data;
      })
      .catch(error => console.error(error));
  }
  // getAllHoadonbanras() {
  //   return this.http.get(environment.APIURL + '/hoadonbanra').pipe(
  //     map((data: any) => { 
  //       this._hoadonbanras.next(data);
  //       return data;
  //     })
  //   );
  // }
  // searchHoadonbanra(query:any) {
  //   return this.http.get(environment.APIURL + `/hoadonbanra/search?query=${query}`).pipe(
  //     map((data: any) => { 
  //       return data;
  //     })
  //   );
  // }
  // getHoadonbanraBySlug(slug: string) {
  //   return this.http.get(environment.APIURL + `/hoadonbanra/findslug/${slug}`).pipe(
  //     map((data: any) => {
  //       this._hoadonbanra.next(data);
  //       return data;
  //     })
  //   );
  // }
  // getPaginaHoadonbanras(page: number, limit: number) {
  //   const params ={ page: String(page), limit: String(limit) }
  //   return this.http.get(environment.APIURL+'/hoadonbanra/pagina',{ params }).pipe(
  //     map((data: any) => {
  //       return data;
  //     })
  //   );
  // }
  // getHoadonbanraById(id: string) {
  //   return this.http.get(environment.APIURL + `/hoadonbanra/findid/${id}`).pipe(
  //     map((data: any) => {
  //       this._hoadonbanra.next(data);
  //       return data;
  //     })
  //   );
  // }
  // CreateHoadonbanra(data: any) {
  //   return this.hoadonbanras$.pipe(
  //     take(1),
  //     switchMap((hoadonbanras: any) =>
  //       this.http.post(environment.APIURL + '/hoadonbanra', data).pipe(
  //         map((hoadonbanra) => {
  //           if (hoadonbanras?.length > 0) {
  //             this._hoadonbanras.next([...hoadonbanras, hoadonbanra]);
  //           }
  //           return hoadonbanra;
  //         })
  //       )
  //     )
  //   );
  // }
  // UpdateHoadonbanra(data: any) {
  //   return this.hoadonbanras$.pipe(
  //     take(1),
  //     switchMap((hoadonbanras: any) =>
  //       this.http.patch(environment.APIURL + `/hoadonbanra/${data.id}`, data).pipe(
  //         map((hoadonbanra) => {
  //           const index = hoadonbanras.findIndex((item: any) => item.id === data.id);
  //           if (index != -1) {
  //             hoadonbanras[index] = data;
  //             this._hoadonbanras.next(hoadonbanras as any[]);
  //           } else {
  //             this._hoadonbanras.next([hoadonbanra]);

  //           }
  //           return hoadonbanra;
  //         })
  //       )
  //     )
  //   );
  // }
  // DeleteHoadonbanra(id: string) {
  //   return this.hoadonbanras$.pipe(
  //     take(1),
  //     switchMap((hoadonbanras: any) =>
  //       this.http.delete(environment.APIURL + `/hoadonbanra/${id}`).pipe(
  //         map((isDelete) => {
  //           const updateHoadonbanra = hoadonbanras.filter((e: any) => e.id != id);
  //           this._hoadonbanras.next(updateHoadonbanra);
  //           return isDelete;
  //         })
  //       )
  //     )
  //   );
  // }
}
