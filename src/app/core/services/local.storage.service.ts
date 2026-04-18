import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { environment } from '@env/environment';

@Injectable()
export class LocalStorageService {

    private readonly isServer = isPlatformServer(inject(PLATFORM_ID));

    save(name: string, data: unknown) {
        if (this.isServer) return;

        const raw = localStorage.getItem(environment.storageKey);
        const store = raw ? JSON.parse(raw) : {};
        store[name] = data;
        localStorage.setItem(environment.storageKey, JSON.stringify(store));
    }

    get(name: string) {
        if (this.isServer) return undefined;

        const raw = localStorage.getItem(environment.storageKey);
        if (!raw) {
            localStorage.setItem(environment.storageKey, JSON.stringify({}));
            return undefined;
        }

        const store = JSON.parse(raw);
        if (!store[name]) {
            return name.endsWith('Array') ? [] : {};
        }
        return store[name];
    }
}
