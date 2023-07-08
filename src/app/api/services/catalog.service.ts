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

import { PriceListProduct } from '../models/price-list-product';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root',
})
export class CatalogService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCart
   */
  static readonly GetCartPath = '/catalog/cart';

  /**
   * Cart Product list.
   *
   * Product List from id product list
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Response(params: {

    /**
     * Product ids
     */
    ids: Array<number>;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PriceListProduct>>> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.GetCartPath, 'get');
    if (params) {
      rb.query('ids', params.ids, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PriceListProduct>>;
      })
    );
  }

  /**
   * Cart Product list.
   *
   * Product List from id product list
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart(params: {

    /**
     * Product ids
     */
    ids: Array<number>;
    context?: HttpContext
  }
): Observable<Array<PriceListProduct>> {

    return this.getCart$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PriceListProduct>>) => r.body as Array<PriceListProduct>)
    );
  }

  /**
   * Path part for operation getProducts
   */
  static readonly GetProductsPath = '/catalog/products/{categoryId}';

  /**
   * Category Products.
   *
   * Product Categories, active, not discontinued & not BOM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProducts$Response(params: {

    /**
     * Product Category ID
     */
    categoryId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PriceListProduct>>> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.GetProductsPath, 'get');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PriceListProduct>>;
      })
    );
  }

  /**
   * Category Products.
   *
   * Product Categories, active, not discontinued & not BOM
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProducts(params: {

    /**
     * Product Category ID
     */
    categoryId: number;
    context?: HttpContext
  }
): Observable<Array<PriceListProduct>> {

    return this.getProducts$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PriceListProduct>>) => r.body as Array<PriceListProduct>)
    );
  }

  /**
   * Path part for operation getCategories
   */
  static readonly GetCategoriesPath = '/catalog/categories';

  /**
   * Product Category List.
   *
   * Product Categories, active, not discontinued & not BOM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ProductCategory>>> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.GetCategoriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductCategory>>;
      })
    );
  }

  /**
   * Product Category List.
   *
   * Product Categories, active, not discontinued & not BOM
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories(params?: {
    context?: HttpContext
  }
): Observable<Array<ProductCategory>> {

    return this.getCategories$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProductCategory>>) => r.body as Array<ProductCategory>)
    );
  }

  /**
   * Path part for operation getProductsFeatured
   */
  static readonly GetProductsFeaturedPath = '/catalog/products/featured';

  /**
   * Featured products.
   *
   * Featured products - IsWebstoreFeatured = 'Y'
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductsFeatured()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsFeatured$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PriceListProduct>>> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.GetProductsFeaturedPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PriceListProduct>>;
      })
    );
  }

  /**
   * Featured products.
   *
   * Featured products - IsWebstoreFeatured = 'Y'
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProductsFeatured$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsFeatured(params?: {
    context?: HttpContext
  }
): Observable<Array<PriceListProduct>> {

    return this.getProductsFeatured$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PriceListProduct>>) => r.body as Array<PriceListProduct>)
    );
  }

  /**
   * Path part for operation getProductsSearch
   */
  static readonly GetProductsSearchPath = '/catalog/products/search/{searchString}';

  /**
   * Search products.
   *
   * Searching products by Name or Description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductsSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsSearch$Response(params: {

    /**
     * Searching string
     */
    searchString: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PriceListProduct>>> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.GetProductsSearchPath, 'get');
    if (params) {
      rb.path('searchString', params.searchString, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PriceListProduct>>;
      })
    );
  }

  /**
   * Search products.
   *
   * Searching products by Name or Description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProductsSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsSearch(params: {

    /**
     * Searching string
     */
    searchString: string;
    context?: HttpContext
  }
): Observable<Array<PriceListProduct>> {

    return this.getProductsSearch$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PriceListProduct>>) => r.body as Array<PriceListProduct>)
    );
  }

}
