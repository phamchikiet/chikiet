import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BanraService {
  private _banras: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _banra: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _banrachitiets: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _banrachitiet: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get banras$(): Observable<any[] | null> {
    return this._banras.asObservable();
  }
  get banra$(): Observable<any | null> {
    return this._banra.asObservable();
  }
  get banrachitiets$(): Observable<any[] | null> {
    return this._banrachitiets.asObservable();
  }
  get banrachitiet$(): Observable<any | null> {
    return this._banrachitiet.asObservable();
  }
  constructor() {}
  async ListBanras() {
    try {
          const response = await fetch(environment.APIURL + '/banra');
          const data = await response.json();
          this._banras.next(data);          
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async UpdateBanra(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/banra/${item.id}`, options);
          const result = await response.json();
          console.log(result);
          
      } catch (error) {
          return console.error(error);
      }
  }
  async DeleteBanra(id:any) {
    try {
      const response = await fetch(`${environment.APIURL}/banra/${id}`, {
        method: 'DELETE'
      });
    const result = await response.json();
    console.log(result);
        
    } catch (error) {
        return console.error(error);
    }
  // Handle response and display success/error message
  }
  async getAllBanras() {
    try {
          const response = await fetch(environment.APIURL + '/banrachitiet/pagination?page=1&perPage=5000');
          const data = await response.json();
          const Batdau = new Date('2023-11-01')
          const Ketthuc = new Date('2023-11-31')
          const data2 = data.data.filter((v:any)=>
                {
                    const Ngaytao = new Date(v.Ngaytao)
                    return Ngaytao.getTime() >= Batdau.getTime() && Ngaytao.getTime() <= Ketthuc.getTime()
                } 
          )
          console.log('Banra',data2);
          this._banras.next(data2);
      } catch (error) {
          return console.error(error);
      }
  }
  async Tinhtoan() {
    try {
          const response = await fetch(environment.APIURL + '/banrachitiet/pagination?page=1&perPage=5000');
          const data = await response.json();
          const response2 = await fetch(environment.APIURL + '/banra/pagination?page=1&perPage=5000');
          const data2 = await response2.json();
          const mergedArray = this.mergeNoDup(data2.data,data.data,'SHD')
          console.log(data.data);
          console.log(data2.data);
          console.log(mergedArray);
      } catch (error) {
          return console.error(error);
      }
  }
  mergeNoDup(arr1: any, arr2: any, key: any) {
    const mergedArray = arr1.concat(arr2);
    const uniqueItems = mergedArray.reduce((acc: any, item: any) => {
      if (acc[item[key]]) {
        acc[item[key]] = item;
      }
      return acc;
    }, {});
    return Object.values(uniqueItems);
  }

  async getBanrachitiets() {
    try {
        const response = await fetch(environment.APIURL + '/banrachitiet');
        const data = await response.json();
        this._banrachitiets.next(data)
      } catch (error) {
          return console.error(error);
      }
  }
}


// Function for fetching data
// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Create
// async function createItem() {
//   const response = await fetch(your_api_endpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data_to_send)
//   });
//   // Handle response and display success/error message
// }

// // Read
// async function readItems() {
//   const data = await fetchData(your_api_endpoint);
//   // Display fetched data in your UI
// }

// // Update
// async function updateItem(id) {
//   const response = await fetch(`${your_api_endpoint}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data_to_send)
//   });
//   // Handle response and display success/error message
// }

// // Delete
// async function deleteItem(id) {
//   const response = await fetch(`${your_api_endpoint}/${id}`, {
//     method: 'DELETE'
//   });
//   // Handle response and display success/error message
// }