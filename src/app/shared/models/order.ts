import {DocumentItem} from './document-item';
import {Address} from './address';
import {PriceListProduct} from './pricelist-product';
import {Shipper} from './shipper';
import {Payment} from './payment';
import {Shipment} from './shipment';
import {Tax} from './tax';

export interface Order extends DocumentItem {
  shipAddress: Address;
  billAddress: Address;
  payments: Payment[];
  shipments: Shipment[];
  invoices: DocumentItem;
  shipper: Shipper;
  lines: PriceListProduct[];
  taxes: Tax[];
}
