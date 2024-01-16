import { Injectable } from '@angular/core';
import { environment } from 'fe_ketoan/src/environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShdhhpService {
  private _shdhhps: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _shdhhp: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor() {}
  async getAllShdhhp() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/hoadonhhp`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateShdhhp(item:any) {
    console.log(item);
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/hoadonhhp`, options);          
          return await response.json();                  
      } catch (error) {
          return console.error(error);
      }
  }  
  async SearchShdhhp(item:any) {
    console.log(item);
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/hoadonhhp/search`, options);         
         return await response.json();                  
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateShdhhp(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/hoadonhhp/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteShdhhp(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/hoadonhhp/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  } 
}

