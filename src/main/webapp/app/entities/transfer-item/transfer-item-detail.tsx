import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './transfer-item.reducer';

export const TransferItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const transferItemEntity = useAppSelector(state => state.transferItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="transferItemDetailsHeading">Transfer Item</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{transferItemEntity.id}</dd>
          <dt>
            <span id="itemName">Item Name</span>
          </dt>
          <dd>{transferItemEntity.itemName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{transferItemEntity.description}</dd>
          <dt>Transaction Class</dt>
          <dd>{transferItemEntity.transactionClass ? transferItemEntity.transactionClass.className : ''}</dd>
          <dt>Transaction Account</dt>
          <dd>{transferItemEntity.transactionAccount ? transferItemEntity.transactionAccount.accountName : ''}</dd>
        </dl>
        <Button tag={Link} to="/transfer-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transfer-item/${transferItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TransferItemDetail;
