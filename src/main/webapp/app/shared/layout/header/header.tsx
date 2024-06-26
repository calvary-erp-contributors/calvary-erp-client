import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, ERPMenu, AccountMenu, AboutMenu } from '../menus';
import { SalesReceiptMenu } from 'app/shared/layout/menus/salesReceipt';
import { PeopleManMenu } from 'app/shared/layout/menus/people-man.menu';
import { ReportMenu } from 'app/shared/layout/menus/reports.menu';
import { AccountingDropDownMenu } from 'app/shared/layout/menus/accounting-dropdown-nav.menu';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDev: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="bg-dark">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            <Home />
            {props.isAuthenticated && <ReportMenu />}
            {props.isAuthenticated && <AccountingDropDownMenu />}
            {props.isAuthenticated && <SalesReceiptMenu />}
            {props.isAuthenticated && <PeopleManMenu />}
            {props.isAuthenticated && <ERPMenu />}
            {props.isAuthenticated && props.isDev && <EntitiesMenu />}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
            <AboutMenu />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
