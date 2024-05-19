export interface IAccountBalanceReportItem {
  id?: number;
  accountNumber?: string | null;
  accountName?: string | null;
  accountBalance?: number | null;
}

export const defaultValue: Readonly<IAccountBalanceReportItem> = {};
