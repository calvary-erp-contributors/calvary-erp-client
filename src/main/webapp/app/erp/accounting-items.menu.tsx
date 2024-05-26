import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const AccountingMenuItems = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/transaction-entry">
        Transaction Entry
      </MenuItem>
      <MenuItem icon="asterisk" to="/account-transaction">
        Account Transaction
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-account">
        Transaction Account
      </MenuItem>
    </>
  );
};

export default AccountingMenuItems;
