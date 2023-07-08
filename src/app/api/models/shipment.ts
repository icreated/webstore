/* tslint:disable */
/* eslint-disable */
import { DocumentLine } from './document-line';
export interface Shipment {
  date?: string;
  description?: string;
  docStatus?: string;
  docStatusName?: string;
  documentNo?: string;
  id?: number;
  lines?: Array<DocumentLine>;
  trackingNo?: string;
}
