import dayjs from 'dayjs';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface ISalesReceiptCompilation {
  id?: number;
  timeOfCompilation?: string | null;
  compilationIdentifier?: string | null;
  receiptsCompiled?: number | null;
  compiledBy?: IApplicationUser | null;
}

export const defaultValue: Readonly<ISalesReceiptCompilation> = {};
