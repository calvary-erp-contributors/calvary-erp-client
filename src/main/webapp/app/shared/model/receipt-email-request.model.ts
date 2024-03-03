import dayjs from 'dayjs';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface IReceiptEmailRequest {
  id?: number;
  timeOfRequisition?: string;
  uploadComplete?: boolean | null;
  numberOfUpdates?: number | null;
  requestedBy?: IApplicationUser | null;
}

export const defaultValue: Readonly<IReceiptEmailRequest> = {
  uploadComplete: false,
};
