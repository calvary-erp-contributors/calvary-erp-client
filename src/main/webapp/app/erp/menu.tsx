import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const ERPMenuItems = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/accounting-event">
        Accounting Event
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-account">
        Transaction Account
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-entry">
        Transaction Entry
      </MenuItem>
      <MenuItem icon="asterisk" to="/account-transaction">
        Account Transaction
      </MenuItem>
      <MenuItem icon="asterisk" to="/event-type">
        Event Type
      </MenuItem>
      <MenuItem icon="asterisk" to="/dealer-type">
        Dealer Type
      </MenuItem>
      <MenuItem icon="asterisk" to="/dealer">
        Dealer
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-account-type">
        Transaction Account Type
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-currency">
        Transaction Currency
      </MenuItem>
      <MenuItem icon="asterisk" to="/balance-sheet-item-type">
        Balance Sheet Item Type
      </MenuItem>
      <MenuItem icon="asterisk" to="/balance-sheet-item-value">
        Balance Sheet Item Value
      </MenuItem>
      <MenuItem icon="asterisk" to="/sales-receipt">
        Sales Receipt
      </MenuItem>
      <MenuItem icon="asterisk" to="/sales-receipt-title">
        Sales Receipt Title
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-class">
        Transaction Class
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-item">
        Transaction Item
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-item-entry">
        Transaction Item Entry
      </MenuItem>
      <MenuItem icon="asterisk" to="/transfer-item">
        Transfer Item
      </MenuItem>
      <MenuItem icon="asterisk" to="/receipt-email-request">
        Receipt Email Request
      </MenuItem>
    </>
  );
};

export default ERPMenuItems;
