import { Injectable, inject, signal } from '@angular/core';
import { LocalStorageService } from 'fe_shop/src/app/shared/localstorage.service';
import { GenId } from 'fe_shop/src/app/shared/shared.utils';
import { environment } from 'fe_shop/src/environments/environment';
import { BehaviorSubject, map, Observable, Subject, switchMap, take } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GiohangService {
    _LocalStorageService:LocalStorageService=inject(LocalStorageService)
    private _giohang: BehaviorSubject<any| null> = new BehaviorSubject<any | null>(null);
    private _donhang: BehaviorSubject<any| null> = new BehaviorSubject<any | null>(null);
    Giohangs: any  = this._LocalStorageService.getItem('Giohang')||[]
    Donhang:any = this._LocalStorageService.getItem('Donhang')||{}
    get giohang$(): Observable<any[] | null> {
      return this._giohang.asObservable();
    }
    get donhang$(): Observable<any | null> {
      return this._donhang.asObservable();
    }
    async getGiohangs(): Promise<any> {
        this._giohang.next(this.Giohangs)
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/giohang`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // this._giohang.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getGiohangByUser(id:any): Promise<any> {
        this._giohang.next(this.Giohangs)
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/giohang/findUser/${id}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._giohang.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getDonhang(): Promise<any> {
        this._donhang.next(this.Donhang)
        this._LocalStorageService.setItem('Donhang',this.Donhang)
        // try {
        //     const options = {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     };
        //     const response = await fetch(`${environment.APIURL}/donhang`, options);
        //     if (!response.ok) { // Check for non-2xx status codes
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const data = await response.json();
        //     // this._giohang.next(data)
        // } catch (error) {
        //     return console.error(error);
        // }
    }
    async getDonhangByid(id:any): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/findid/${id}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._donhang.next(data)
            this._LocalStorageService.setItem('Donhang',data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getDonhangByUser(id:any): Promise<any> {
        this._donhang.next(this.Donhang)
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/findUser/${id}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
           // this._giohang.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
      async CreateDonhang(item:any) {  
            item.Giohangs = item.Giohangs.map((v:any)=>({
                id:v.id,
                id_cat:v.id_cat,
                Title: v.Title,
                Danhmuc: v.Danhmuc,
                Slug: v.Slug,
                Giachon: v.Giachon,
                Giagoc: v.Giagoc,
                Image: v.Image,
                Soluong:v.Soluong
            }))
            try {
                const options = {
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                };
                const response = await fetch(`${environment.APIURL}/donhang`, options);  
                if (!response.ok) { // Check for non-2xx status codes
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                this._donhang.next({})
                this._LocalStorageService.removeItem('Donhang')
                return data             
            } catch (error) {
                return console.error(error);
            }
        }  
    async UpdateDonhang(data:any): Promise<any> {
        this._donhang.next(data)
        this._LocalStorageService.setItem('Donhang',this.Donhang)
        // try {
        //     const options = {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     };
        //     const response = await fetch(`${environment.APIURL}/donhang`, options);
        //     if (!response.ok) { // Check for non-2xx status codes
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const data = await response.json();
        //     // this._giohang.next(data)
        // } catch (error) {
        //     return console.error(error);
        // }
    }
    async addToCart(item: any): Promise<void> {        
        if(Object.entries(this.Donhang).length===0)
        {
            this.Donhang.MaDonHang = "RSTG"+GenId(8,false)
            this.Donhang.Khachhang = {Hoten:'Guest'}
            this.Donhang.Thanhtoan ={}
            this.Donhang.Vanchuyen ={}
            this.Donhang.Status=0
            this.Donhang.Giohangs=[item]
            this._LocalStorageService.setItem('Donhang',this.Donhang)
            this._donhang.next(this.Donhang)
        }
        else
        {
            const existingItemIndex = this.Donhang.Giohangs.findIndex((v:any) => v.id === item.id && v.Giachon?.id==item?.Giachon?.id);
            console.log(existingItemIndex);
            if (existingItemIndex !== -1) {
                this.Donhang.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
            } else {
                this.Donhang.Giohangs.push(item);
            }
            this._LocalStorageService.setItem('Donhang',this.Donhang)
            this._donhang.next(this.Donhang)
        }


        // this._giohang.next(this.Giohangs)
        // try {
        //     const options = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(item),
        //     };
        //     const response = await fetch(`${environment.APIURL}/giohang`, options);
        //     if (!response.ok) { // Check for non-2xx status codes
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const data = await response.json();
        //     this.addItemSubject.next(data);
        // } catch (error) {
        //     return console.error(error);
        // }

    }
    async Crement(item: any): Promise<void> {        
        if(Object.entries(this.Donhang).length===0)
        {
            this.Donhang.MaDonHang = "RSTG"+GenId(8,false)
            this.Donhang.Khachhang = {Hoten:'Guest'}
            this.Donhang.Thanhtoan ={}
            this.Donhang.Vanchuyen ={}
            this.Donhang.Status=0
            this.Donhang.Giohangs=[item]
            this._LocalStorageService.setItem('Donhang',this.Donhang)
            this._donhang.next(this.Donhang)
        }
        else
        {
            const existingItemIndex = this.Donhang.Giohangs.findIndex((v:any) => v.id === item.id && v.Giachon?.id==item?.Giachon?.id);
            console.log(existingItemIndex);
            if (existingItemIndex !== -1) {
                this.Donhang.Giohangs[existingItemIndex].Soluong = Number(item.Soluong);
            } else {
                this.Donhang.Giohangs.push(item);
            }
            this._LocalStorageService.setItem('Donhang',this.Donhang)
            this._donhang.next(this.Donhang)
        }
    }

    async removeFromCart(item:any): Promise<void> {
        const existingItemIndex = this.Donhang.Giohangs.findIndex((v:any) => v.id === item.id && v.Giachon?.id==item?.Giachon?.id);
        if (existingItemIndex !== -1) {
            this.Donhang.Giohangs.splice(existingItemIndex, 1);
          }
        this._LocalStorageService.setItem('Donhang',this.Donhang)
        this._donhang.next(this.Donhang)
        // const Updatedata = this.removeItemById(item)
        // try {
        //     const options = {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(Updatedata),
        //     };
        //     const response = await fetch(`${environment.APIURL}/giohang/${Cart.id}`, options);
        //     if (!response.ok) { // Check for non-2xx status codes
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     this.removeItemSubject.next(item);
        //     return await response.json();
        // } catch (error) {
        //     return console.error(error);
        // }
    }

    // constructor() {
    //     this.addItemSubject.pipe(
    //         map(item => this.addOrUpdateItem(item))
    //     ).subscribe(updatedCart => this.cartSubject.next(updatedCart));

    //     this.removeItemSubject.pipe(
    //         map(itemId => this.removeItemById(itemId))
    //     ).subscribe(updatedCart => this.cartSubject.next(updatedCart));
    // }

    // private addOrUpdateItem(item: any): any[] {
    //     const existingItemIndex = this.cartItems.findIndex(i => i.id === item.id);
    //     if (existingItemIndex !== -1) {
    //         this.cartItems[existingItemIndex].Soluong += item.Soluong;
    //     } else {
    //         this.cartItems.push(item);
    //     }
    //     return this.cartItems;
    // }
    // private removeItemById(itemId: any): any[] {
    //     this.cartItems = this.cartItems.filter(i => i.id !== itemId);
    //     return this.cartItems;
    // }
    async clearCart(): Promise<void> {
        this.Giohangs=[]
        this._giohang.next(this.Giohangs)
        this._LocalStorageService.setItem('Giohang',this.Giohangs)
    }
    // updateItemQuantity(itemId: number, newQuantity: number): void {
    //     const itemIndex = this.cartItems.findIndex(i => i.id === itemId);
    //     if (itemIndex !== -1) {
    //         this.cartItems[itemIndex].Soluong = newQuantity;
    //         this.cartSubject.next(this.cartItems);
    //     }
    // }


    // async getAllGiohang() {
    //     try {
    //         const options = {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         };
    //         const response = await fetch(`${environment.APIURL}/giohang`, options);
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         return console.error(error);
    //     }
    // }
    async SearchDonhang(SearchParams: any) {
        console.log(SearchParams);

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SearchParams),
            };
            const response = await fetch(`${environment.APIURL}/donhang/search`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    // async CreateGiohang(item: any) {
    //     console.log(item);

    //     try {
    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(item),
    //         };
    //         const response = await fetch(`${environment.APIURL}/giohang`, options);
    //         if (!response.ok) { // Check for non-2xx status codes
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //     } catch (error) {
    //         return console.error(error);
    //     }
    // }
    // async UpdateGiohang(item: any) {
    //     try {
    //         const options = {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(item),
    //         };
    //         const response = await fetch(`${environment.APIURL}/giohang/${item.id}`, options);
    //         return await response.json();
    //     } catch (error) {
    //         return console.error(error);
    //     }
    // }
    // async DeleteGiohang(item: any) {
    //     try {
    //         const options = {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         };
    //         const response = await fetch(`${environment.APIURL}/giohang/${item.id}`, options);
    //         return await response.json();
    //     } catch (error) {
    //         return console.error(error);
    //     }
    // }
}

