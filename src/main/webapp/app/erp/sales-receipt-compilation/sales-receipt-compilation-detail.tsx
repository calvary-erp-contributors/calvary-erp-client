import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sales-receipt-compilation.reducer';

export const SalesReceiptCompilationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const salesReceiptCompilationEntity = useAppSelector(state => state.salesReceiptCompilation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="salesReceiptCompilationDetailsHeading">Sales Receipt Compilation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{salesReceiptCompilationEntity.id}</dd>
          <dt>
            <span id="timeOfCompilation">Time Of Compilation</span>
          </dt>
          <dd>
            {salesReceiptCompilationEntity.timeOfCompilation ? (
              <TextFormat value={salesReceiptCompilationEntity.timeOfCompilation} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="compilationIdentifier">Compilation Identifier</span>
          </dt>
          <dd>{salesReceiptCompilationEntity.compilationIdentifier}</dd>
          <dt>
            <span id="receiptsCompiled">Receipts Compiled</span>
          </dt>
          <dd>{salesReceiptCompilationEntity.receiptsCompiled}</dd>
          <dt>Compiled By</dt>
          <dd>{salesReceiptCompilationEntity.compiledBy ? salesReceiptCompilationEntity.compiledBy.applicationIdentity : ''}</dd>
        </dl>
        <Button tag={Link} to="/sales-receipt-compilation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sales-receipt-compilation/${salesReceiptCompilationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SalesReceiptCompilationDetail;
