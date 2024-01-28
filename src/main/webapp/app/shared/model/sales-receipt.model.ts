import dayjs from 'dayjs';
import { ITransactionClass } from 'app/shared/model/transaction-class.model';
import { IDealer } from 'app/shared/model/dealer.model';
import { ISalesReceiptTitle } from 'app/shared/model/sales-receipt-title.model';
import { ITransactionItemEntry } from 'app/shared/model/transaction-item-entry.model';
import { ITransferItemEntry } from 'app/shared/model/transfer-item-entry.model';
import { ITransactionItem } from 'app/shared/model/transaction-item.model';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalesReceipt {
  id?: number;
  description?: string | null;
  transactionDate?: string;
  hasBeenEmailed?: boolean | null;
  hasBeenProposed?: boolean | null;
  shouldBeEmailed?: boolean | null;
  transactionClass?: ITransactionClass | null;
  dealer?: IDealer;
  salesReceiptTitle?: ISalesReceiptTitle;
  transactionItemEntries?: ITransactionItemEntry[] | null;
  transferItemEntries?: ITransferItemEntry[] | null;
}

export class SalesReceipt implements ISalesReceipt {
  constructor(
    public id?: number,
    public description?: string | null,
    public transactionDate: string = dayjs().format(APP_LOCAL_DATE_FORMAT),
    public hasBeenEmailed?: boolean | null,
    public hasBeenProposed?: boolean | null,
    public shouldBeEmailed?: boolean | null,
    public transactionClass?: ITransactionClass | null,
    public dealer?: IDealer | null,
    public salesReceiptTitle?: ISalesReceiptTitle,
    public transactionItemEntries?: ITransactionItem[] | null,
    public transferItemEntries?: ITransferItemEntry[] | null
  ) {}
}

export const defaultValue: Readonly<ISalesReceipt> = {
  hasBeenEmailed: false,
  hasBeenProposed: false,
  shouldBeEmailed: false,
  transactionDate: dayjs().format('yyyy-MM-dd'),
  transactionItemEntries: [],
  transferItemEntries: [],
};
