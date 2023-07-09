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

import { Order } from '../models/order';
import { PaymentParam } from '../models/payment-param';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation payment
   */
  static readonly PaymentPath = '/checkout/payment';

  /**
   * Payment Creation.
   *
   * Create simple payment
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `payment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  payment$Response(params: {
    context?: HttpContext

    /**
     * Payment Param
     */
    body: PaymentParam
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.PaymentPath, 'post');
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
   * Payment Creation.
   *
   * Create simple payment
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `payment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  payment(params: {
    context?: HttpContext

    /**
     * Payment Param
     */
    body: PaymentParam
  }
): Observable<void> {

    return this.payment$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createOrder
   */
  static readonly CreateOrderPath = '/checkout/order';

  /**
   * Order Creation.
   *
   * Create order
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder$Response(params: {
    context?: HttpContext

    /**
     * Order Form
     */
    body: Order
  }
): Observable<StrictHttpResponse<Order>> {

    const rb = new RequestBuilder(this.rootUrl, CheckoutService.CreateOrderPath, 'post');
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
        return r as StrictHttpResponse<Order>;
      })
    );
  }

  /**
   * Order Creation.
   *
   * Create order
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder(params: {
    context?: HttpContext

    /**
     * Order Form
     */
    body: Order
  }
): Observable<Order> {

    return this.createOrder$Response(params).pipe(
      map((r: StrictHttpResponse<Order>) => r.body as Order)
    );
  }

}
