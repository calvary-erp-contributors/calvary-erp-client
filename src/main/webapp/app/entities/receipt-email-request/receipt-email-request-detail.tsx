import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './receipt-email-request.reducer';

export const ReceiptEmailRequestDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const receiptEmailRequestEntity = useAppSelector(state => state.receiptEmailRequest.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="receiptEmailRequestDetailsHeading">Receipt Email Request</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{receiptEmailRequestEntity.id}</dd>
          <dt>
            <span id="timeOfRequisition">Time Of Requisition</span>
          </dt>
          <dd>
            {receiptEmailRequestEntity.timeOfRequisition ? (
              <TextFormat value={receiptEmailRequestEntity.timeOfRequisition} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="uploadComplete">Upload Complete</span>
          </dt>
          <dd>{receiptEmailRequestEntity.uploadComplete ? 'true' : 'false'}</dd>
          <dt>
            <span id="numberOfUpdates">Number Of Updates</span>
          </dt>
          <dd>{receiptEmailRequestEntity.numberOfUpdates}</dd>
          <dt>Requested By</dt>
          <dd>{receiptEmailRequestEntity.requestedBy ? receiptEmailRequestEntity.requestedBy.applicationIdentity : ''}</dd>
        </dl>
        <Button tag={Link} to="/receipt-email-request" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/receipt-email-request/${receiptEmailRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReceiptEmailRequestDetail;
