import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ReceiptEmailRequest from './receipt-email-request';
import ReceiptEmailRequestDetail from './receipt-email-request-detail';
import ReceiptEmailRequestUpdate from './receipt-email-request-update';
import ReceiptEmailRequestDeleteDialog from './receipt-email-request-delete-dialog';

const ReceiptEmailRequestRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReceiptEmailRequest />} />
    <Route path="new" element={<ReceiptEmailRequestUpdate />} />
    <Route path=":id">
      <Route index element={<ReceiptEmailRequestDetail />} />
      <Route path="edit" element={<ReceiptEmailRequestUpdate />} />
      <Route path="delete" element={<ReceiptEmailRequestDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReceiptEmailRequestRoutes;
