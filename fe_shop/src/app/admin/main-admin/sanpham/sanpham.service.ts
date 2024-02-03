import { Injectable } from '@angular/core';
import { environment } from 'fe_shop/src/environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
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
  async getSanphamBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/sanpham/findslug/${Slug}`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getSanphamByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/sanpham/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();         
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchSanpham(SearchParams:any) {
    console.log(SearchParams);
    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/sanpham/search`,options);
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
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();        
          console.log(data);
           
          return data;  
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

