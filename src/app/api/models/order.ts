/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { Document } from './document';
import { DocumentLine } from './document-line';
import { Shipment } from './shipment';
import { Shipper } from './shipper';
import { Tax } from './tax';
export interface Order {
  billAddress?: Address;
  date?: string;
  description?: string;
  docStatus?: string;
  docStatusName?: string;
  documentNo?: string;
  grandTotal?: number;
  id: number;
  invoices?: Array<Document>;
  lines?: Array<DocumentLine>;
  poReference?: string;
  shipAddress?: Address;
  shipments?: Array<Shipment>;
  shipper?: Shipper;
  taxes?: Array<Tax>;
  totalLines?: number;
}
