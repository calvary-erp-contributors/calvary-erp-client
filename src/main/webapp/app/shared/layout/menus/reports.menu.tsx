import React from 'react';

import { NavDropdown } from './menu-components';
import ReportMenuItems from 'app/erp/reports.menu';

export const ReportMenu = () => (
  <NavDropdown icon="th-list" name="Report" id="report-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <ReportMenuItems />
  </NavDropdown>
);
