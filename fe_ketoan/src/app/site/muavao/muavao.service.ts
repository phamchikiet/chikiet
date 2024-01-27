import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'fe_ketoan/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MuavaoService {
  private _muavaos: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _muavao: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _muavaochitiets: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _muavaochitiet: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get muavaos$(): Observable<any[] | null> {
    return this._muavaos.asObservable();
  }
  get muavao$(): Observable<any | null> {
    return this._muavao.asObservable();
  }
  get muavaochitiets$(): Observable<any[] | null> {
    return this._muavaochitiets.asObservable();
  }
  get muavaochitiet$(): Observable<any | null> {
    return this._muavaochitiet.asObservable();
  }
  constructor() { }
  async GetMuavaos(Begin: any, End: any, SHD: any, Token: any, ttxly: any = 5) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Token,
          redirect: 'follow'
        }
      };

      // https://hoadondientu.gdt.gov.vn:30000/query/invoices/purchase?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=15&search=tdlap=ge=19/12/2023T00:00:00;tdlap=le=18/01/2024T23:59:59;ttxly==5;shdon==603
      const response = await fetch(`https://hoadondientu.gdt.gov.vn:30000/query/invoices/purchase?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=15&search=tdlap=ge=${Begin};tdlap=le=${End};shdon==${SHD}`, options);
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
  async ListMuavaos() {
    try {
      const response = await fetch(environment.APIURL + '/muavao');
      const data = await response.json();
      this._muavaos.next(data);
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchMuavao(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/muavao/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async UpdateMuavao(item: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/muavao/${item.id}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }
  async DeleteMuavao(itemId: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/muavao/${itemId}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }

  async GetMuavaochitiets(nbmst: any, khhdon: any, shdon: any, khmshdon: any, Token: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Token,
          redirect: 'follow'
        }
      };

      // https://hoadondientu.gdt.gov.vn:30000/query/invoices/purchase?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=15&search=tdlap=ge=19/12/2023T00:00:00;tdlap=le=18/01/2024T23:59:59;ttxly==5;shdon==603
      const response = await fetch(`https://hoadondientu.gdt.gov.vn:30000/query/invoices/detail?nbmst=${nbmst}&khhdon=${khhdon}&shdon=${shdon}&khmshdon=${khmshdon}`, options);
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
  async ListMuavaochitiets() {
    try {
      const response = await fetch(environment.APIURL + '/muavaochitiet');
      const data = await response.json();
      this._muavaochitiets.next(data);
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async Createvaochitiet(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/muavaochitiet`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchMuavaochitiet(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/muavaochitiet/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async DeleteMuavaochitiet(itemId: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/muavaochitiet/${itemId}`, options);
      const result = await response.json();
      console.log(result);

    } catch (error) {
      return console.error(error);
    }
  }


  async getAllMuavaoChitiet() {
    try {
      const response = await fetch(environment.APIURL + '/muavaochitiet');
      const data = await response.json();
      // const Batdau = new Date('2023-11-01')
      // const Ketthuc = new Date('2023-11-31')
      // const data2 = data.data.filter((v:any)=>
      //       {
      //           const Ngaytao = new Date(v.Ngaytao)
      //           return Ngaytao.getTime() >= Batdau.getTime() && Ngaytao.getTime() <= Ketthuc.getTime()
      //       } 
      // )
      // console.log('Muavao',data2);
      this._muavaochitiets.next(data);
    } catch (error) {
      return console.error(error);
    }
  }
  async CreateMuavaos(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/muavao`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      return console.error(error);
    }
  }
  async UpdateMuavaoChitiet(item: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/muavaochitiet/${item.id}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data

    } catch (error) {
      return console.error(error);
    }
  }
  async Tinhtoan() {
    try {
      const response = await fetch(environment.APIURL + '/muavaochitiet/pagination?page=1&perPage=5000');
      const data = await response.json();
      const response2 = await fetch(environment.APIURL + '/muavao/pagination?page=1&perPage=5000');
      const data2 = await response2.json();
      const mergedArray = this.mergeNoDup(data2.data, data.data, 'SHD')
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

  async getMuaVaochitiet() {
    try {
      const response = await fetch(environment.APIURL + '/muavaochitiet/pagination?page=1&perPage=5000');
      const data = await response.json();
      console.log(data.data);
      data.data.forEach(async (v: any) => {
        v.Ngaytao = new Date(v.Dulieu.ntao)
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(v),
        };
        const response1 = await fetch(`${environment.APIURL}/muavaochitiet/${v.id}`, options);
        const result = await response1.json();
        console.log(result);
        console.log('Product updated!');
      });
      //   const data2 = data.data.filter((v:any)=>
      //  {
      //     return new Date(v.Ngaytao) >= new Date('2023-11-01')&& new Date(v.Ngaytao)<= new Date('2023-11-31')
      //  } 
      //   )
      //   console.log('Muavao',data2);
      //   this._muavaos.next(data2);
    } catch (error) {
      return console.error(error);
    }
  }
}
