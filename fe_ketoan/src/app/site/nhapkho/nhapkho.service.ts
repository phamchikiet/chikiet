import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NhapkhoService {
  private _nhapkhos: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _nhapkho: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _nhapkhochitiets: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _nhapkhochitiet: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get nhapkhos$(): Observable<any[] | null> {
    return this._nhapkhos.asObservable();
  }
  get nhapkho$(): Observable<any | null> {
    return this._nhapkho.asObservable();
  }
  get nhapkhochitiets$(): Observable<any[] | null> {
    return this._nhapkhochitiets.asObservable();
  }
  get nhapkhochitiet$(): Observable<any | null> {
    return this._nhapkhochitiet.asObservable();
  }
  constructor() { }
  async ListNhapkhos() {
    try {
      const response = await fetch(environment.APIURL + '/nhapkho');
      const data = await response.json();
      this._nhapkhos.next(data);
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchNhapkho(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/nhapkho/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async UpdateNhapkho(item: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/nhapkho/${item.id}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async DeleteNhapkho(itemId: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/nhapkho/${itemId}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async CreateNhapkhos(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/nhapkho`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      return console.error(error);
    }
  }
}
