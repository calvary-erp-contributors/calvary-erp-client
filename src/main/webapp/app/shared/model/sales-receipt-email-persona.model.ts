import dayjs from 'dayjs';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { IDealer } from 'app/shared/model/dealer.model';

export interface ISalesReceiptEmailPersona {
  id?: number;
  personaName?: string;
  emailIdentifier?: string;
  mainEmail?: string;
  clearCopyEmail?: boolean | null;
  blindCopyEmail?: boolean | null;
  languageKeyCode?: string;
  preferredGreeting?: string;
  preferredGreetingDesignation?: string | null;
  preferredPrefix?: string | null;
  preferredSuffix?: string | null;
  timeBasedGreetings?: boolean | null;
  sloganBasedGreeting?: boolean | null;
  addPrefix?: boolean | null;
  addSuffix?: boolean | null;
  preferredSignature?: string;
  preferredSignatureDesignation?: string;
  includeServiceDetails?: boolean | null;
  includeMessageOfTheDay?: boolean | null;
  includeTreasuryQuote?: boolean | null;
  createdAt?: string;
  lastModifedAt?: string | null;
  createdBy?: IApplicationUser | null;
  lastModifiedBy?: IApplicationUser | null;
  contributor?: IDealer | null;
}

export const defaultValue: Readonly<ISalesReceiptEmailPersona> = {
  clearCopyEmail: false,
  blindCopyEmail: false,
  timeBasedGreetings: false,
  sloganBasedGreeting: false,
  addPrefix: false,
  addSuffix: false,
  includeServiceDetails: false,
  includeMessageOfTheDay: false,
  includeTreasuryQuote: false,
};
