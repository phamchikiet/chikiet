import { Injectable } from '@angular/core';
import { environment } from 'fe_shop/src/environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BaivietAdminService {
  private _baivietadmins: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _baivietadmin: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor() {}
  async getAllBaivietAdmin() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/baiviet`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchBaivietAdmin(SearchParams:any) {
    console.log(SearchParams);
    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/baiviet/search`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateBaivietAdmin(item:any) {
    console.log(item);
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/baiviet`, options);          
          return await response.json();                  
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateBaivietAdmin(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/baiviet/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteBaivietAdmin(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/baiviet/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  } 
}

