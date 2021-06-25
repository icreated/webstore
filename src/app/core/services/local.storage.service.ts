import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {Library} from '../library';

@Injectable()
export class LocalStorageService {

  private isNode: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    //   this.isNode = typeof module !== 'undefined'
    this.isNode = isPlatformServer(this.platformId);
  }


  save(name: any, data: any) {
    if (this.isNode) {
      return;
    }

    const localDataString = localStorage.getItem(Library.STORAGE_KEY);
    let localData: any;
    if (localDataString) {
      localData = JSON.parse(localDataString);
    } else {
      localData = {};
    }
    localData[name] = data;
    localStorage.setItem(Library.STORAGE_KEY, JSON.stringify(localData));
  }

  get(name: any) {
    if (this.isNode) {
      return;
    }
    const data = JSON.parse(localStorage.getItem(Library.STORAGE_KEY));
    if (!data) {
      return undefined;
    }
    if (name) {
      if (data[name]) {
        return data[name];
      } else {
        return {};
      }
    }
    return data;
  }
}
