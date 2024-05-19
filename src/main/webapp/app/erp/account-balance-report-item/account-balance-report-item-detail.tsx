import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './account-balance-report-item.reducer';

export const AccountBalanceReportItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const accountBalanceReportItemEntity = useAppSelector(state => state.accountBalanceReportItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="accountBalanceReportItemDetailsHeading">Account Balance Report Item</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{accountBalanceReportItemEntity.id}</dd>
          <dt>
            <span id="accountNumber">Account Number</span>
          </dt>
          <dd>{accountBalanceReportItemEntity.accountNumber}</dd>
          <dt>
            <span id="accountName">Account Name</span>
          </dt>
          <dd>{accountBalanceReportItemEntity.accountName}</dd>
          <dt>
            <span id="accountBalance">Account Balance</span>
          </dt>
          <dd>{accountBalanceReportItemEntity.accountBalance}</dd>
        </dl>
        <Button tag={Link} to="/account-balance-report-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-balance-report-item/${accountBalanceReportItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AccountBalanceReportItemDetail;
