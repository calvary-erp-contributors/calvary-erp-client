import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const SalesReceiptMenuItems = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/sales-receipt">
        Sales Receipt
      </MenuItem>
      <MenuItem icon="asterisk" to="/transaction-item-entry">
        Transaction Item Entry
      </MenuItem>
      <MenuItem icon="asterisk" to="/transfer-item-entry">
        Transfer Item Entry
      </MenuItem>
      <MenuItem icon="asterisk" to="/sales-receipt-proposal">
        Sales Receipt Proposal
      </MenuItem>
      <MenuItem icon="asterisk" to="/sales-receipt-compilation">
        Sales Receipt Compilation
      </MenuItem>
      <MenuItem icon="asterisk" to="/sales-receipt-update">
        Sales Receipt Update
      </MenuItem>
    </>
  );
};

export default SalesReceiptMenuItems;
