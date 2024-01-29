import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TonkhoService {
  private _tonkhos: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _tonkho: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _tonkhochitiets: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _tonkhochitiet: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get tonkhos$(): Observable<any[] | null> {
    return this._tonkhos.asObservable();
  }
  get tonkho$(): Observable<any | null> {
    return this._tonkho.asObservable();
  }
  get tonkhochitiets$(): Observable<any[] | null> {
    return this._tonkhochitiets.asObservable();
  }
  get tonkhochitiet$(): Observable<any | null> {
    return this._tonkhochitiet.asObservable();
  }
  constructor() { }
  async ListTonkhos() {
    try {
      const response = await fetch(environment.APIURL + '/tonkho');
      const data = await response.json();
      this._tonkhos.next(data);
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchTonkho(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/tonkho/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async UpdateTonkho(item: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/tonkho/${item.id}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async DeleteTonkho(itemId: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/tonkho/${itemId}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async CreateTonkhos(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/tonkho`, options);
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
