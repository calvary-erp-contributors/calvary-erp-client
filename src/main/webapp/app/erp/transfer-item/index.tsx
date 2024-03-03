import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TransferItem from './transfer-item';
import TransferItemDetail from './transfer-item-detail';
import TransferItemUpdate from './transfer-item-update';
import TransferItemDeleteDialog from './transfer-item-delete-dialog';

const TransferItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TransferItem />} />
    <Route path="new" element={<TransferItemUpdate />} />
    <Route path=":id">
      <Route index element={<TransferItemDetail />} />
      <Route path="edit" element={<TransferItemUpdate />} />
      <Route path="delete" element={<TransferItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TransferItemRoutes;
