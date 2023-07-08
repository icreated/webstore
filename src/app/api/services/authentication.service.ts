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

import { Token } from '../models/token';
import { UserCredentials } from '../models/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authenticateUser
   */
  static readonly AuthenticateUserPath = '/auth/login';

  /**
   * Login.
   *
   * Login
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticateUser$Response(params: {
    context?: HttpContext

    /**
     * Login Form
     */
    body: UserCredentials
  }
): Observable<StrictHttpResponse<Token>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticateUserPath, 'post');
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
   * Login.
   *
   * Login
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticateUser(params: {
    context?: HttpContext

    /**
     * Login Form
     */
    body: UserCredentials
  }
): Observable<Token> {

    return this.authenticateUser$Response(params).pipe(
      map((r: StrictHttpResponse<Token>) => r.body as Token)
    );
  }

}
