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
  async GetBanras(Begin:any,End:any,SHD:any,Token:any,ttxly:any=0) {    
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Token,
          redirect: 'follow'
        }
      };
      const response = await fetch(`https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=15&search=tdlap=ge=${Begin};tdlap=le=${End};shdon==${SHD};khmshdon==1;ttxly==${ttxly}`,options);
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }

}
async SearchBanra(item:any) {
  try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        };
        const response = await fetch(`${environment.APIURL}/banra/search`, options);         
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
         }
      const data = await response.json();      
      return data          
    } catch (error) {
        return console.error(error);
    }
} 
async CreateBanras(item:any) {
  try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        };
        const response = await fetch(`${environment.APIURL}/banra`, options);          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
       }
        const data = await response.json();
        console.log(data);              
    } catch (error) {
        return console.error(error);
    }
}  
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
  async DeleteBanra(itemId:any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/banra/${itemId}`, options);
      const result = await response.json();
      console.log(result);
          
      } catch (error) {
          return console.error(error);
      }
  }


  async GetBanrachitiets(Begin:any,End:any,SHD:any,Token:any,ttxly:any=0) {    
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Token,
          redirect: 'follow'
        }
      };
      const response = await fetch(`https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=15&search=tdlap=ge=${Begin};tdlap=le=${End};shdon==${SHD}`,options);
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }

}
async SearchBanrachitiet(item:any) {
  try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        };
        const response = await fetch(`${environment.APIURL}/banrachitiet/search`, options);         
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();      
      return data          
    } catch (error) {
        return console.error(error);
    }
} 
async CreateBanrachitiets(item:any) {
  try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        };
        const response = await fetch(`${environment.APIURL}/banrachitiet`, options);          
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
       }
        const data = await response.json();
        console.log(data);              
    } catch (error) {
        return console.error(error);
    }
}  
  async ListBanrachitiets() {
    try {
          const response = await fetch(environment.APIURL + '/banrachitiet');
          const data = await response.json();
          this._banrachitiets.next(data);          
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async UpdateBanrachitiet(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/banrachitiet/${item.id}`, options);
          const result = await response.json();
          console.log(result);
          
      } catch (error) {
          return console.error(error);
      }
  }
  async DeleteBanrachitiet(itemId:any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/banrachitiet/${itemId}`, options);
      const result = await response.json();
      console.log(result);
          
      } catch (error) {
          return console.error(error);
      }
  }




  
  async getAllBanraChitiet() {
    try {
          const response = await fetch(environment.APIURL + '/banrachitiet');
          const data = await response.json();
          // const Batdau = new Date('2023-11-01')
          // const Ketthuc = new Date('2023-11-31')
          // const data2 = data.data.filter((v:any)=>
          //       {
          //           const Ngaytao = new Date(v.Ngaytao)
          //           return Ngaytao.getTime() >= Batdau.getTime() && Ngaytao.getTime() <= Ketthuc.getTime()
          //       } 
          // )
          // console.log('Banra',data2);
          this._banrachitiets.next(data);
      } catch (error) {
          return console.error(error);
      }
  }
  async UpdateBanraChitiet(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/banrachitiet/${item.id}`, options);
          const result = await response.json();
          console.log(result);
          
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

  async getBanrachitiet() {
    try {
        const response = await fetch(environment.APIURL + '/banrachitiet/pagination?page=1&perPage=5000');
        const data = await response.json();
        console.log(data.data);
        data.data.forEach(async (v:any) => {
            v.Ngaytao = new Date(v.Dulieu.ntao)
            const options = {
                method:'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(v),
              };
              const response1 = await fetch(`${environment.APIURL}/banrachitiet/${v.id}`, options);
              const result = await response1.json();
             console.log(result);
           console.log('Product updated!'); 
        });
        //   const data2 = data.data.filter((v:any)=>
        //  {
        //     return new Date(v.Ngaytao) >= new Date('2023-11-01')&& new Date(v.Ngaytao)<= new Date('2023-11-31')
        //  } 
        //   )
        //   console.log('Banra',data2);
        //   this._banras.next(data2);
      } catch (error) {
          return console.error(error);
      }
  }
}
