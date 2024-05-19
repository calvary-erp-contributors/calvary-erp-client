import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AccountBalanceReportItem from './account-balance-report-item';
import AccountBalanceReportItemDetail from './account-balance-report-item-detail';

const AccountBalanceReportItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AccountBalanceReportItem />} />
    <Route path=":id">
      <Route index element={<AccountBalanceReportItemDetail />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AccountBalanceReportItemRoutes;
