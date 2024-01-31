import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class XuatkhoService {
  private _xuatkhos: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _xuatkho: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _xuatkhochitiets: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _xuatkhochitiet: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get xuatkhos$(): Observable<any[] | null> {
    return this._xuatkhos.asObservable();
  }
  get xuatkho$(): Observable<any | null> {
    return this._xuatkho.asObservable();
  }
  get xuatkhochitiets$(): Observable<any[] | null> {
    return this._xuatkhochitiets.asObservable();
  }
  get xuatkhochitiet$(): Observable<any | null> {
    return this._xuatkhochitiet.asObservable();
  }
  constructor() { }
  async ListXuatkhos() {
    try {
      const response = await fetch(environment.APIURL + '/xuatkho');
      const data = await response.json();
      this._xuatkhos.next(data);
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchXuatkho(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/xuatkho/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async UpdateXuatkho(item: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/xuatkho/${item.id}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async DeleteXuatkho(itemId: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/xuatkho/${itemId}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async CreateXuatkhos(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/xuatkho`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      return console.error(error);
    }
  }
  async findtensp(item: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/xuatkho/findtensp/${item}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }
}
