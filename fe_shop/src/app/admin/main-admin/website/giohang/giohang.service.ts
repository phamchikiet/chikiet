import { Injectable, inject, signal } from '@angular/core';
import { LocalStorageService } from 'fe_shop/src/app/shared/localstorage.service';
import { GenId, genMaDonhang } from 'fe_shop/src/app/shared/shared.utils';
import { environment } from 'fe_shop/src/environments/environment';
import { BehaviorSubject, map, Observable, Subject, switchMap, take } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GiohangService {
    _LocalStorageService: LocalStorageService = inject(LocalStorageService)
    private _giohang: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    private _donhang: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    private _addonhangs: BehaviorSubject<any[] | []> = new BehaviorSubject<any | null>(null);
    private _addonhang: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    // Giohangs: any  = this._LocalStorageService.getItem('Giohang')||[]
    Donhang: any = this._LocalStorageService.getItem('Donhang') || { Giohangs: [],Khachhang:{},Thanhtoan:{},Vanchuyen:{} }
    get addonhangs$(): Observable<any[] | null> {
        return this._addonhangs.asObservable();
    }
    get addonhang$(): Observable<any | null> {
        return this._addonhang.asObservable();
    }
    get giohang$(): Observable<any[] | null> {
        return this._giohang.asObservable();
    }
    get donhang$(): Observable<any | null> {
        return this._donhang.asObservable();
    }
    async getSoluongDon(): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/getSoluong`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data[1]
        } catch (error) {
            return console.error(error);
        }
    }
    async getGiohangs(): Promise<any> {
        //  this._giohang.next(this.Giohangs)
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
    async getGiohangByUser(id: any): Promise<any> {
        // this._giohang.next(this.Giohangs)
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
    async getAdDonhangs(): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._addonhangs.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getAdDonhangByid(id: any): Promise<any> {
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
            this._addonhang.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getDonhangByid(id: any): Promise<any> {
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
            this._LocalStorageService.setItem('Donhang', data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getDonhangByUser(id: any): Promise<any> {
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
        } catch (error) {
            return console.error(error);
        }
    }
    async CreateDonhang(item: any) {
        item.Giohangs = item.Giohangs.map((v: any) => ({
            id: v.id,
            id_cat: v.id_cat,
            Title: v.Title,
            Danhmuc: v.Danhmuc,
            Slug: v.Slug,
            Giachon: v.Giachon,
            Giagoc: v.Giagoc,
            Image: v.Image,
            Soluong: v.Soluong
        }))
        try {
            const options = {
                method: 'POST',
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
            // this._donhang.next({ Giohangs: [] })
            this._LocalStorageService.removeItem('Donhang')
            return data
        } catch (error) {
            return console.error(error);
        }
    }
    async UpdateDonhang(item: any): Promise<any> {
        console.log(item);
        
        this._donhang.next(item)
        this.getDonhang()
        //this._LocalStorageService.setItem('Donhang', this.Donhang)
        try {
            const options = {
                method:'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
              };
              const response = await fetch(`${environment.APIURL}/donhang/${item.id}`, options);
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
    async addToCart(item: any): Promise<void> {
        if (!this.Donhang.hasOwnProperty('MaDonHang')) {
            this.Donhang.MaDonHang = genMaDonhang(await this.getSoluongDon())
            this.Donhang.Khachhang = { Hoten: '' }
            this.Donhang.Thanhtoan = {}
            this.Donhang.Vanchuyen = {}
            this.Donhang.Status = 0
            this.Donhang.Giohangs = [item]
            this._LocalStorageService.setItem('Donhang', this.Donhang)
            this._donhang.next(this.Donhang)
        }
        else {
            const existingItemIndex = this.Donhang.Giohangs.findIndex((v: any) => v.id === item.id && v.Giachon?.id == item?.Giachon?.id);
            console.log(existingItemIndex);
            if (existingItemIndex !== -1) {
                this.Donhang.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
            } else {
                this.Donhang.Giohangs.push(item);
            }
            this._LocalStorageService.setItem('Donhang', this.Donhang)
            this._donhang.next(this.Donhang)
        }
    }
    async Crement(item: any): Promise<void> {
        if (!this.Donhang.hasOwnProperty('MaDonHang')) {
            this.Donhang.MaDonHang = genMaDonhang(await this.getSoluongDon())
            this.Donhang.Khachhang = { Hoten: '' }
            this.Donhang.Thanhtoan = {}
            this.Donhang.Vanchuyen = {}
            this.Donhang.Status = 0
            this.Donhang.Giohangs = [item]
            this._LocalStorageService.setItem('Donhang', this.Donhang)
            this._donhang.next(this.Donhang)
        }
        else {
            const existingItemIndex = this.Donhang.Giohangs.findIndex((v: any) => v.id === item.id && v.Giachon?.id == item?.Giachon?.id);
            console.log(existingItemIndex);
            if (existingItemIndex !== -1) {
                this.Donhang.Giohangs[existingItemIndex].Soluong = Number(item.Soluong);
            } else {
                this.Donhang.Giohangs.push(item);
            }
            this._LocalStorageService.setItem('Donhang', this.Donhang)
            this._donhang.next(this.Donhang)
        }
    }

    async removeFromCart(item: any): Promise<void> {
        const existingItemIndex = this.Donhang.Giohangs.findIndex((v: any) => v.id === item.id && v.Giachon?.id == item?.Giachon?.id);
        if (existingItemIndex !== -1) {
            this.Donhang.Giohangs.splice(existingItemIndex, 1);
        }
        this._LocalStorageService.setItem('Donhang', this.Donhang)
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
    async clearCart(): Promise<void> {
        this.Donhang = { Giohangs: [] }
        this._donhang.next(this.Donhang)
        this._LocalStorageService.setItem('Donhang', this.Donhang)
    }
    async SearchDonhang(SearchParams: any) {
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
    getGiamgia()
    {
        if (this.Donhang.hasOwnProperty('Khuyenmai')) {
            if (this.Donhang.Khuyenmai.Type.Value == 'phantram') {
                this.Donhang.Giamgia = this.Donhang.SubTotal * (Number(this.Donhang.Khuyenmai.Value) / 100)
                return this.Donhang.Giamgia
            }
            else {
                if (this.Donhang.Khuyenmai.Value > this.Donhang.SubTotal) {
                    this.Donhang.Giamgia = 0
                    return this.Donhang.Giamgia
                }
                else {
                    this.Donhang.Giamgia = this.Donhang.SubTotal - this.Donhang.Khuyenmai.Value
                    return this.Donhang.Giamgia
                }

            }
        }
        else return 0  
    }
    getSum(data: any, field: any, field1: any) {
        if (field1) {
          return data?.reduce((acc: any, item: any) => acc + item[field] * item[field1]?.gia, 0) || 0;
        }
        else {
          return data?.reduce((acc: any, item: any) => acc + item[field], 0) || 0;
        }
    }
    async getDonhang(): Promise<any> {
        this.Donhang.SubTotal = this.Donhang.Giohangs.reduce((acc: any, item: any) => acc + item.Soluong * item.Giachon?.gia, 0) || 0;
        this.getGiamgia()
        this._donhang.next(this.Donhang)
        this._LocalStorageService.setItem('Donhang', this.Donhang)
    }
}

