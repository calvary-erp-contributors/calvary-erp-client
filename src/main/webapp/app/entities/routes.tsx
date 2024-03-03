import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AccountingEvent from './accounting-event';
import TransactionAccount from './transaction-account';
import TransactionEntry from './transaction-entry';
import AccountTransaction from './account-transaction';
import EventType from './event-type';
import DealerType from './dealer-type';
import Dealer from './dealer';
import TransactionAccountType from './transaction-account-type';
import TransactionCurrency from './transaction-currency';
import BalanceSheetItemType from './balance-sheet-item-type';
import BalanceSheetItemValue from './balance-sheet-item-value';
import SalesReceipt from './sales-receipt';
import TransactionClass from './transaction-class';
import TransactionItem from './transaction-item';
import TransactionItemAmount from './transaction-item-amount';
import TransactionItemEntry from './transaction-item-entry';
import SalesReceiptTitle from './sales-receipt-title';
import TransferItemEntry from './transfer-item-entry';
import SalesReceiptProposal from './sales-receipt-proposal';
import ApplicationUser from './application-user';
import SalesReceiptCompilation from './sales-receipt-compilation';
import ReceiptEmailRequest from './receipt-email-request';
import TransferItem from './transfer-item';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="accounting-event/*" element={<AccountingEvent />} />
        <Route path="transaction-account/*" element={<TransactionAccount />} />
        <Route path="transaction-entry/*" element={<TransactionEntry />} />
        <Route path="account-transaction/*" element={<AccountTransaction />} />
        <Route path="event-type/*" element={<EventType />} />
        <Route path="dealer-type/*" element={<DealerType />} />
        <Route path="dealer/*" element={<Dealer />} />
        <Route path="transaction-account-type/*" element={<TransactionAccountType />} />
        <Route path="transaction-currency/*" element={<TransactionCurrency />} />
        <Route path="balance-sheet-item-type/*" element={<BalanceSheetItemType />} />
        <Route path="balance-sheet-item-value/*" element={<BalanceSheetItemValue />} />
        <Route path="sales-receipt/*" element={<SalesReceipt />} />
        <Route path="transaction-class/*" element={<TransactionClass />} />
        <Route path="transaction-item/*" element={<TransactionItem />} />
        <Route path="transaction-item-amount/*" element={<TransactionItemAmount />} />
        <Route path="transaction-item-entry/*" element={<TransactionItemEntry />} />
        <Route path="sales-receipt-title/*" element={<SalesReceiptTitle />} />
        <Route path="transfer-item-entry/*" element={<TransferItemEntry />} />
        <Route path="sales-receipt-proposal/*" element={<SalesReceiptProposal />} />
        <Route path="application-user/*" element={<ApplicationUser />} />
        <Route path="sales-receipt-compilation/*" element={<SalesReceiptCompilation />} />
        <Route path="receipt-email-request/*" element={<ReceiptEmailRequest />} />
        <Route path="transfer-item/*" element={<TransferItem />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
