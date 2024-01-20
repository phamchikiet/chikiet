import { Injectable, inject, signal } from '@angular/core';
import { LocalStorageService } from 'fe_shop/src/app/shared/localstorage.service';
import { environment } from 'fe_shop/src/environments/environment';
import { BehaviorSubject, map, Observable, Subject, switchMap, take } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GiohangService {
    _LocalStorageService:LocalStorageService=inject(LocalStorageService)
    private _giohang: BehaviorSubject<any| null> = new BehaviorSubject<any | null>(null);
    Giohangs: any  = this._LocalStorageService.getItem('Giohang')||[]
    get giohang$(): Observable<any[] | null> {
      return this._giohang.asObservable();
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
    async gietGiohangByUser(id:any): Promise<any> {
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

    async addToCart(item: any): Promise<void> {
        const existingItemIndex = this.Giohangs.findIndex((v:any) => v.id === item.id);
        console.log(existingItemIndex);
        
        if (existingItemIndex !== -1) {
            this.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
        } else {
            this.Giohangs.push(item);
        }
        this._LocalStorageService.setItem('Giohang',this.Giohangs)
        this._giohang.next(this.Giohangs)

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
    // async removeFromCart(Cart: any,item:any): Promise<void> {
    //     const Updatedata = this.removeItemById(item)
    //     try {
    //         const options = {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(Updatedata),
    //         };
    //         const response = await fetch(`${environment.APIURL}/giohang/${Cart.id}`, options);
    //         if (!response.ok) { // Check for non-2xx status codes
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         this.removeItemSubject.next(item);
    //         return await response.json();
    //     } catch (error) {
    //         return console.error(error);
    //     }
    // }

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
    // async clearCart(Cart:any): Promise<void> {
    //     try {
    //         const options = {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         };
    //         const response = await fetch(`${environment.APIURL}/giohang/${Cart.id}`, options);
    //         if (!response.ok) { // Check for non-2xx status codes
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         this.cartItems = [];
    //         this.cartSubject.next(this.cartItems);
    //         return await response.json();
    //     } catch (error) {
    //         return console.error(error);
    //     }
    // }
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
    // async SearchGiohang(SearchParams: any) {
    //     console.log(SearchParams);

    //     try {
    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(SearchParams),
    //         };
    //         const response = await fetch(`${environment.APIURL}/giohang/search`, options);
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         return console.error(error);
    //     }
    // }
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

