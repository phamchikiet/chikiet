import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class XuatnhaptonService {
  private _xuatnhaptons: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _xuatnhapton: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _xuatnhaptonchitiets: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _xuatnhaptonchitiet: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get xuatnhaptons$(): Observable<any[] | null> {
    return this._xuatnhaptons.asObservable();
  }
  get xuatnhapton$(): Observable<any | null> {
    return this._xuatnhapton.asObservable();
  }
  get xuatnhaptonchitiets$(): Observable<any[] | null> {
    return this._xuatnhaptonchitiets.asObservable();
  }
  get xuatnhaptonchitiet$(): Observable<any | null> {
    return this._xuatnhaptonchitiet.asObservable();
  }
  constructor() { }
  async ListXuatnhaptons() {
    try {
      const response = await fetch(environment.APIURL + '/xuatnhapton');
      const data = await response.json();
      this._xuatnhaptons.next(data);
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchXuatnhapton(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/xuatnhapton/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async UpdateXuatnhapton(item: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/xuatnhapton/${item.id}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async DeleteXuatnhapton(itemId: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/xuatnhapton/${itemId}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async CreateXuatnhaptons(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/xuatnhapton`, options);
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
