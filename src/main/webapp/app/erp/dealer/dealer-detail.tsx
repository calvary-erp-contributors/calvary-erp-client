import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './dealer.reducer';

export const DealerDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const dealerEntity = useAppSelector(state => state.dealer.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dealerDetailsHeading">Dealer</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{dealerEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{dealerEntity.name}</dd>
          <dt>
            <span id="mainEmail">Main Email</span>
          </dt>
          <dd>{dealerEntity.mainEmail}</dd>
          <dt>
            <span id="dealerReference">Dealer Reference</span>
          </dt>
          <dd>{dealerEntity.dealerReference}</dd>
          <dt>Dealer Type</dt>
          <dd>{dealerEntity.dealerType ? dealerEntity.dealerType.name : ''}</dd>
          <dt>Sales Receipt Email Persona</dt>
          <dd>
            {dealerEntity.salesReceiptEmailPersonas
              ? dealerEntity.salesReceiptEmailPersonas.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.preferredGreetingDesignation}</a>
                    {dealerEntity.salesReceiptEmailPersonas && i === dealerEntity.salesReceiptEmailPersonas.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/dealer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dealer/${dealerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DealerDetail;
