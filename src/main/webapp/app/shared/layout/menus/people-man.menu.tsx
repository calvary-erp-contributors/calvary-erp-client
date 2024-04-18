import React from 'react';

import { NavDropdown } from './menu-components';
import PeopleManagementMenuItems from 'app/erp/people-man-items.menu';

export const PeopleManMenu = () => (
  <NavDropdown icon="th-list" name="People" id="people-management-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <PeopleManagementMenuItems />
  </NavDropdown>
);
