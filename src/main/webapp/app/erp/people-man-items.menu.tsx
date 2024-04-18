import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const PeopleManagementMenuItems = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/application-user">
        Application User
      </MenuItem>
      <MenuItem icon="asterisk" to="/dealer">
        Dealer
      </MenuItem>
      <MenuItem icon="asterisk" to="/sales-receipt-email-persona">
        Sales Receipt Email Persona
      </MenuItem>
    </>
  );
};

export default PeopleManagementMenuItems;
