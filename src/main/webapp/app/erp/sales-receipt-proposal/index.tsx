import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SalesReceiptProposal from './sales-receipt-proposal';
import SalesReceiptProposalDetail from './sales-receipt-proposal-detail';
import SalesReceiptProposalUpdate from './sales-receipt-proposal-update';
import SalesReceiptProposalDeleteDialog from './sales-receipt-proposal-delete-dialog';

const SalesReceiptProposalRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SalesReceiptProposal />} />
    <Route path="new" element={<SalesReceiptProposalUpdate />} />
    <Route path=":id">
      <Route index element={<SalesReceiptProposalDetail />} />
      <Route path="edit" element={<SalesReceiptProposalUpdate />} />
      <Route path="delete" element={<SalesReceiptProposalDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SalesReceiptProposalRoutes;
