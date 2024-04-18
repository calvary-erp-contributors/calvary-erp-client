import { IDealerType } from 'app/shared/model/dealer-type.model';
import { ISalesReceiptEmailPersona } from 'app/shared/model/sales-receipt-email-persona.model';

export interface IDealer {
  id?: number;
  name?: string;
  mainEmail?: string | null;
  dealerReference?: string | null;
  dealerType?: IDealerType;
  salesReceiptEmailPersonas?: ISalesReceiptEmailPersona[] | null;
}

export const defaultValue: Readonly<IDealer> = {};
