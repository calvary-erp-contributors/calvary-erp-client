import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const ReportMenuItems = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/account-balance-report-item">
        Report Balance Items
      </MenuItem>
    </>
  );
};

export default ReportMenuItems;
