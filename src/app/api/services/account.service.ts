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

import { AccountInfo } from '../models/account-info';
import { Address } from '../models/address';
import { Document } from '../models/document';
import { NewAccountForm } from '../models/new-account-form';
import { Order } from '../models/order';
import { Password } from '../models/password';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getOrders
   */
  static readonly GetOrdersPath = '/account/orders';

  /**
   * Order list.
   *
   * Get customer orders
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Document>>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.GetOrdersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Document>>;
      })
    );
  }

  /**
   * Order list.
   *
   * Get customer orders
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders(params?: {
    context?: HttpContext
  }
): Observable<Array<Document>> {

    return this.getOrders$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Document>>) => r.body as Array<Document>)
    );
  }

  /**
   * Path part for operation getOrder
   */
  static readonly GetOrderPath = '/account/orders/{id}';

  /**
   * Order information.
   *
   * Get order by ID
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrder$Response(params: {

    /**
     * C_Order_ID
     */
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Order>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.GetOrderPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Order>;
      })
    );
  }

  /**
   * Order information.
   *
   * Get order by ID
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrder(params: {

    /**
     * C_Order_ID
     */
    id: number;
    context?: HttpContext
  }
): Observable<Order> {

    return this.getOrder$Response(params).pipe(
      map((r: StrictHttpResponse<Order>) => r.body as Order)
    );
  }

  /**
   * Path part for operation signup
   */
  static readonly SignupPath = '/account';

  /**
   * Account Creation.
   *
   * Create new account
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signup$Response(params: {
    context?: HttpContext

    /**
     * New Account Form
     */
    body: NewAccountForm
  }
): Observable<StrictHttpResponse<Token>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.SignupPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Token>;
      })
    );
  }

  /**
   * Account Creation.
   *
   * Create new account
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `signup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signup(params: {
    context?: HttpContext

    /**
     * New Account Form
     */
    body: NewAccountForm
  }
): Observable<Token> {

    return this.signup$Response(params).pipe(
      map((r: StrictHttpResponse<Token>) => r.body as Token)
    );
  }

  /**
   * Path part for operation getAddresses
   */
  static readonly GetAddressesPath = '/account/addresses';

  /**
   * Address List.
   *
   * Get address list
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAddresses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddresses$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Address>>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.GetAddressesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Address>>;
      })
    );
  }

  /**
   * Address List.
   *
   * Get address list
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAddresses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddresses(params?: {
    context?: HttpContext
  }
): Observable<Array<Address>> {

    return this.getAddresses$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Address>>) => r.body as Array<Address>)
    );
  }

  /**
   * Path part for operation updateAddress
   */
  static readonly UpdateAddressPath = '/account/addresses';

  /**
   * Update address info.
   *
   * Updating address info
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress$Response(params: {
    context?: HttpContext

    /**
     * Address Form
     */
    body: Address
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.UpdateAddressPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Update address info.
   *
   * Updating address info
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress(params: {
    context?: HttpContext

    /**
     * Address Form
     */
    body: Address
  }
): Observable<void> {

    return this.updateAddress$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createAddress
   */
  static readonly CreateAddressPath = '/account/addresses';

  /**
   * Create address info.
   *
   * Create address info
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAddress$Response(params: {
    context?: HttpContext

    /**
     * Address Form
     */
    body: Address
  }
): Observable<StrictHttpResponse<Address>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.CreateAddressPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Address>;
      })
    );
  }

  /**
   * Create address info.
   *
   * Create address info
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAddress(params: {
    context?: HttpContext

    /**
     * Address Form
     */
    body: Address
  }
): Observable<Address> {

    return this.createAddress$Response(params).pipe(
      map((r: StrictHttpResponse<Address>) => r.body as Address)
    );
  }

  /**
   * Path part for operation deleteAddress
   */
  static readonly DeleteAddressPath = '/account/addresses/{id}';

  /**
   * Deactivating address.
   *
   * Deactivating address
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAddress()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAddress$Response(params: {

    /**
     * C_BPartner_Location_ID
     */
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.DeleteAddressPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Deactivating address.
   *
   * Deactivating address
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAddress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAddress(params: {

    /**
     * C_BPartner_Location_ID
     */
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteAddress$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation changePassword
   */
  static readonly ChangePasswordPath = '/account/password';

  /**
   * Password change.
   *
   * Change customer password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: {
    context?: HttpContext

    /**
     * Password Form
     */
    body: Password
  }
): Observable<StrictHttpResponse<Token>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ChangePasswordPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Token>;
      })
    );
  }

  /**
   * Password change.
   *
   * Change customer password
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: {
    context?: HttpContext

    /**
     * Password Form
     */
    body: Password
  }
): Observable<Token> {

    return this.changePassword$Response(params).pipe(
      map((r: StrictHttpResponse<Token>) => r.body as Token)
    );
  }

  /**
   * Path part for operation getOrderFile
   */
  static readonly GetOrderFilePath = '/account/pdf/{type}/{id}';

  /**
   * Order Invoice PDF.
   *
   * Get PDF File
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderFile$Response(params: {

    /**
     * Choice between &#x27;order&#x27;, &#x27;invoice&#x27;
     */
    type: 'order' | 'invoice';

    /**
     * C_Order_ID or C_Invoice_ID depending from type
     */
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.GetOrderFilePath, 'get');
    if (params) {
      rb.path('type', params.type, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/pdf',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Order Invoice PDF.
   *
   * Get PDF File
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrderFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderFile(params: {

    /**
     * Choice between &#x27;order&#x27;, &#x27;invoice&#x27;
     */
    type: 'order' | 'invoice';

    /**
     * C_Order_ID or C_Invoice_ID depending from type
     */
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getOrderFile$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getInfo
   */
  static readonly GetInfoPath = '/account/info';

  /**
   * Account Info.
   *
   * get account information like name, email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfo$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<AccountInfo>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.GetInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AccountInfo>;
      })
    );
  }

  /**
   * Account Info.
   *
   * get account information like name, email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInfo(params?: {
    context?: HttpContext
  }
): Observable<AccountInfo> {

    return this.getInfo$Response(params).pipe(
      map((r: StrictHttpResponse<AccountInfo>) => r.body as AccountInfo)
    );
  }

  /**
   * Path part for operation updateAccount
   */
  static readonly UpdateAccountPath = '/account/info';

  /**
   * Update Account Info.
   *
   * Update account info like name, email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAccount()` instead.
   *
   * This method sends `* / *` and handles request body of type `* / *`.
   */
  updateAccount$Response(params: {
    context?: HttpContext

    /**
     * Account Form
     */
    body: AccountInfo
  }
): Observable<StrictHttpResponse<Token>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.UpdateAccountPath, 'put');
    if (params) {
      rb.body(params.body, '*/*');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Token>;
      })
    );
  }

  /**
   * Update Account Info.
   *
   * Update account info like name, email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAccount$Response()` instead.
   *
   * This method sends `* / *` and handles request body of type `* / *`.
   */
  updateAccount(params: {
    context?: HttpContext

    /**
     * Account Form
     */
    body: AccountInfo
  }
): Observable<Token> {

    return this.updateAccount$Response(params).pipe(
      map((r: StrictHttpResponse<Token>) => r.body as Token)
    );
  }

}
