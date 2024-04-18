import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SalesReceiptEmailPersona from './sales-receipt-email-persona';
import SalesReceiptEmailPersonaDetail from './sales-receipt-email-persona-detail';
import SalesReceiptEmailPersonaUpdate from './sales-receipt-email-persona-update';
import SalesReceiptEmailPersonaDeleteDialog from './sales-receipt-email-persona-delete-dialog';

const SalesReceiptEmailPersonaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SalesReceiptEmailPersona />} />
    <Route path="new" element={<SalesReceiptEmailPersonaUpdate />} />
    <Route path=":id">
      <Route index element={<SalesReceiptEmailPersonaDetail />} />
      <Route path="edit" element={<SalesReceiptEmailPersonaUpdate />} />
      <Route path="delete" element={<SalesReceiptEmailPersonaDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SalesReceiptEmailPersonaRoutes;
