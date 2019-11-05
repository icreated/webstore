
import {HttpHeaders} from '@angular/common/http';

export class Library {

    public static readonly IS_LOCALHOST = false;

    public static readonly API_DOMAIN = 'localhost:8080';

    // TEST LOCALHOST
    public static readonly API_ENDPOINT = 'http://' + Library.API_DOMAIN + '/services/api/';

    public static readonly STORAGE_KEY = 'webStore';
    public static readonly CURRENT_COUNTRY_ID = 100;

}


export const HEADERS = new HttpHeaders();
HEADERS.append('Accept', 'application/json, text/plain');
HEADERS.append('Content-Type', 'application/json, text/plain');

export const OPTIONS = {headers: HEADERS};

