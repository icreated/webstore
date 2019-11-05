import { DocumentItem } from './document-item';
import { Shipper } from './shipper';

export interface Shipment extends DocumentItem {
  shipper: Shipper;
  trackingNo: string;
}
