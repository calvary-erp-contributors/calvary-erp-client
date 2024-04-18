import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SalesReceiptUpdateForm from './sales-receipt-update-form';

const SalesReceiptUpdateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SalesReceiptUpdateForm />} />
  </ErrorBoundaryRoutes>
);

export default SalesReceiptUpdateRoutes;
