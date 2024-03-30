import { ISalesReceipt } from 'app/shared/model/sales-receipt.model';
import { ITransferItem } from 'app/shared/model/transfer-item.model';

export interface ITransferItemEntry {
  id?: number;
  description?: string | null;
  itemAmount?: number;
  salesReceipt?: ISalesReceipt;
  transferItem?: ITransferItem;
}

export const defaultValue: Readonly<ITransferItemEntry> = {};
