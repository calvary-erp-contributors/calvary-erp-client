import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SalesReceiptCompilation from './sales-receipt-compilation';
import SalesReceiptCompilationDetail from './sales-receipt-compilation-detail';
import SalesReceiptCompilationUpdate from './sales-receipt-compilation-update';
import SalesReceiptCompilationDeleteDialog from './sales-receipt-compilation-delete-dialog';

const SalesReceiptCompilationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SalesReceiptCompilation />} />
    <Route path="new" element={<SalesReceiptCompilationUpdate />} />
    <Route path=":id">
      <Route index element={<SalesReceiptCompilationDetail />} />
      <Route path="edit" element={<SalesReceiptCompilationUpdate />} />
      <Route path="delete" element={<SalesReceiptCompilationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SalesReceiptCompilationRoutes;
