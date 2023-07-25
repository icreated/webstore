/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { IdNamePair } from '../models/id-name-pair';
import { Shipper } from '../models/shipper';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class CommonService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCountries
   */
  static readonly GetCountriesPath = '/common/countries';

  /**
   * Country List.
   *
   * List of all countries
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCountries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountries$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IdNamePair>>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.GetCountriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IdNamePair>>;
      })
    );
  }

  /**
   * Country List.
   *
   * List of all countries
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCountries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountries(params?: {
    context?: HttpContext
  }
): Observable<Array<IdNamePair>> {

    return this.getCountries$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IdNamePair>>) => r.body as Array<IdNamePair>)
    );
  }

  /**
   * Path part for operation lookupEmail
   */
  static readonly LookupEmailPath = '/common/lookup/email';

  /**
   * Email lookup.
   *
   * Lookup Email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lookupEmail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lookupEmail$Response(params: {
    context?: HttpContext

    /**
     * Token Form
     */
    body: Token
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.LookupEmailPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/text',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Email lookup.
   *
   * Lookup Email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `lookupEmail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lookupEmail(params: {
    context?: HttpContext

    /**
     * Token Form
     */
    body: Token
  }
): Observable<boolean> {

    return this.lookupEmail$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getShippers
   */
  static readonly GetShippersPath = '/common/shippers';

  /**
   * Shipper List.
   *
   * List of all shippers
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getShippers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getShippers$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Shipper>>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.GetShippersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Shipper>>;
      })
    );
  }

  /**
   * Shipper List.
   *
   * List of all shippers
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getShippers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getShippers(params?: {
    context?: HttpContext
  }
): Observable<Array<Shipper>> {

    return this.getShippers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Shipper>>) => r.body as Array<Shipper>)
    );
  }

}
