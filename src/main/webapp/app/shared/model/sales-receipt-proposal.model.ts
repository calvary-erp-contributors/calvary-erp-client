import dayjs from 'dayjs';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface ISalesReceiptProposal {
  id?: number;
  timeOfPosting?: string;
  postingIdentifier?: string;
  numberOfReceiptsPosted?: number | null;
  proposedBy?: IApplicationUser | null;
}

export const defaultValue: Readonly<ISalesReceiptProposal> = {};
