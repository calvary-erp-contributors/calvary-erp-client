import AccountingMenuItems from 'app/erp/accounting-items.menu';
import React from 'react';
import { NavDropdown } from './menu-components';

export const AccountingDropDownMenu = () => (
  <NavDropdown icon="th-list" name="Accounting" id="accounting-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <AccountingMenuItems />
  </NavDropdown>
);
