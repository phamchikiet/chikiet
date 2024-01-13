import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppService {

    constructor() { }
    private isDarkTheme = new BehaviorSubject<boolean>(false);
    isDarkTheme$ = this.isDarkTheme.asObservable();

    toggleTheme() {
        this.isDarkTheme.next(!this.isDarkTheme.getValue());
    }

    setDarkTheme(isEnabled: boolean) {
        this.isDarkTheme.next(isEnabled);
    }

    getDarkTheme(): boolean {
        return this.isDarkTheme.getValue();
    }
}
