import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sales-receipt-proposal.reducer';

export const SalesReceiptProposalDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const salesReceiptProposalEntity = useAppSelector(state => state.salesReceiptProposal.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="salesReceiptProposalDetailsHeading">Sales Receipt Proposal</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{salesReceiptProposalEntity.id}</dd>
          <dt>
            <span id="timeOfPosting">Time Of Posting</span>
          </dt>
          <dd>
            {salesReceiptProposalEntity.timeOfPosting ? (
              <TextFormat value={salesReceiptProposalEntity.timeOfPosting} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="postingIdentifier">Posting Identifier</span>
          </dt>
          <dd>{salesReceiptProposalEntity.postingIdentifier}</dd>
          <dt>
            <span id="numberOfReceiptsPosted">Number Of Receipts Posted</span>
          </dt>
          <dd>{salesReceiptProposalEntity.numberOfReceiptsPosted}</dd>
          <dt>Proposed By</dt>
          <dd>{salesReceiptProposalEntity.proposedBy ? salesReceiptProposalEntity.proposedBy.applicationIdentity : ''}</dd>
        </dl>
        <Button tag={Link} to="/sales-receipt-proposal" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sales-receipt-proposal/${salesReceiptProposalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SalesReceiptProposalDetail;
