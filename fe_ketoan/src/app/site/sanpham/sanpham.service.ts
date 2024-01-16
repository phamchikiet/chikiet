import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  private _sanphams: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _sanpham: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor() {}
  async getAllSanpham() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/sanpham`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateSanpham(item:any) {
    console.log(item);
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/sanpham`, options);
          console.log(response.json());
          
          return await response.json();                  
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateSanpham(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/sanpham/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteSanpham(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/sanpham/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  } 
}
