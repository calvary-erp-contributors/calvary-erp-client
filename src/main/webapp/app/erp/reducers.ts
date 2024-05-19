import accountingEvent from 'app/erp/accounting-event/accounting-event.reducer';
import transactionAccount from 'app/erp/transaction-account/transaction-account.reducer';
import transactionEntry from 'app/erp/transaction-entry/transaction-entry.reducer';
import accountTransaction from 'app/erp/account-transaction/account-transaction.reducer';
import eventType from 'app/erp/event-type/event-type.reducer';
import dealerType from 'app/erp/dealer-type/dealer-type.reducer';
import dealer from 'app/erp/dealer/dealer.reducer';
import transactionAccountType from 'app/erp/transaction-account-type/transaction-account-type.reducer';
import transactionCurrency from 'app/erp/transaction-currency/transaction-currency.reducer';
import balanceSheetItemType from 'app/erp/balance-sheet-item-type/balance-sheet-item-type.reducer';
import balanceSheetItemValue from 'app/erp/balance-sheet-item-value/balance-sheet-item-value.reducer';
import salesReceipt from 'app/erp/sales-receipt/sales-receipt.reducer';
import salesReceiptProposal from 'app/erp/sales-receipt-proposal/sales-receipt-proposal.reducer';
import salesReceiptTitle from 'app/erp/sales-receipt-title/sales-receipt-title.reducer';
import transactionClass from 'app/erp/transaction-class/transaction-class.reducer';
import transactionItem from 'app/erp/transaction-item/transaction-item.reducer';
import transactionItemAmount from 'app/erp/transaction-item-amount/transaction-item-amount.reducer';
import transactionItemEntry from 'app/erp/transaction-item-entry/transaction-item-entry.reducer';
import transferItemEntry from 'app/erp/transfer-item-entry/transfer-item-entry.reducer';
import salesReceiptCompilation from 'app/erp/sales-receipt-compilation/sales-receipt-compilation.reducer';
import salesReceiptEmailPersona from './sales-receipt-email-persona/sales-receipt-email-persona.reducer';
import applicationUser from './application-user/application-user.reducer';
import receiptEmailRequest from 'app/erp/receipt-email-request/receipt-email-request.reducer';
import transferItem from './transfer-item/transfer-item.reducer';
import salesReceiptUpdate from './sales-receipt-update/sales-receipt.reducer';
import accountBalanceReportItem from './account-balance-report-item/account-balance-report-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const erpReducers = {
  accountingEvent,
  transactionAccount,
  transactionEntry,
  accountTransaction,
  eventType,
  dealerType,
  dealer,
  transactionAccountType,
  transactionCurrency,
  balanceSheetItemType,
  balanceSheetItemValue,
  salesReceipt,
  salesReceiptProposal,
  salesReceiptCompilation,
  salesReceiptTitle,
  salesReceiptUpdate,
  transactionClass,
  transactionItem,
  transactionItemAmount,
  transactionItemEntry,
  transferItemEntry,
  receiptEmailRequest,
  transferItem,
  salesReceiptEmailPersona,
  applicationUser,
  accountBalanceReportItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default erpReducers;
