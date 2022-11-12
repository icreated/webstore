import {HttpHeaders} from '@angular/common/http';

export class Library {
  public static readonly apiDomain = 'localhost:8080';

    // TEST LOCALHOST
    public static readonly apiEndpoint = 'http://' + Library.apiDomain + '/services/api/';

    public static readonly storageKey = 'webStore';
    public static readonly currentCountryId = 100;
  public static readonly webMasterEmail = 'webmaster@mycompany';

}


export const HEADERS = new HttpHeaders();
HEADERS.append('Accept', 'application/json, text/plain');
HEADERS.append('Content-Type', 'application/json, text/plain');

export const OPTIONS = {headers: HEADERS};

