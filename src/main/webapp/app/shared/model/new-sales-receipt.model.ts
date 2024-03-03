import dayjs from 'dayjs';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITransactionClass } from 'app/shared/model/transaction-class.model';
import { IDealer } from 'app/shared/model/dealer.model';
import { ISalesReceiptTitle } from 'app/shared/model/sales-receipt-title.model';
import { ITransactionItem } from 'app/shared/model/transaction-item.model';
import { ITransferItemEntry } from 'app/shared/model/transfer-item-entry.model';
import { ISalesReceipt } from 'app/shared/model/sales-receipt.model';

export class NewSalesReceipt implements ISalesReceipt {
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
