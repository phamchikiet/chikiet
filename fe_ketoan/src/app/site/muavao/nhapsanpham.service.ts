import { Injectable } from '@angular/core';
import { environment } from 'fe_ketoan/src/environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NhapsanphamService {
  private _nhapsanphams: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _nhapsanpham: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor() {}
  async getAllNhapsanpham() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/nhapsanpham`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchNhapsanpham(SearchParams:any) {
    console.log(SearchParams);
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/nhapsanpham/search`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateNhapsanpham(item:any) {
    console.log(item);
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/nhapsanpham`, options);          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
          const data = await response.json();
          console.log(data);                
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateNhapsanpham(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/nhapsanpham/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteNhapsanpham(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/nhapsanpham/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  } 
}

