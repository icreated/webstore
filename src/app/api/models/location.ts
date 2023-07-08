/* tslint:disable */
/* eslint-disable */
import { Country } from './country';
export interface Location {
  address1: string;
  address2?: string;
  city: string;
  country: Country;
  id?: number;
  postal: string;
}
