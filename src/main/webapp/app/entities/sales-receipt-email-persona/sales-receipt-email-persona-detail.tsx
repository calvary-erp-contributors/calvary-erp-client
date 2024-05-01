import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sales-receipt-email-persona.reducer';

export const SalesReceiptEmailPersonaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const salesReceiptEmailPersonaEntity = useAppSelector(state => state.salesReceiptEmailPersona.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="salesReceiptEmailPersonaDetailsHeading">Sales Receipt Email Persona</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.id}</dd>
          <dt>
            <span id="personaName">Persona Name</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.personaName}</dd>
          <dt>
            <span id="emailIdentifier">Email Identifier</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.emailIdentifier}</dd>
          <dt>
            <span id="mainEmail">Main Email</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.mainEmail}</dd>
          <dt>
            <span id="clearCopyEmail">Clear Copy Email</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.clearCopyEmail ? 'true' : 'false'}</dd>
          <dt>
            <span id="blindCopyEmail">Blind Copy Email</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.blindCopyEmail ? 'true' : 'false'}</dd>
          <dt>
            <span id="languageKeyCode">Language Key Code</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.languageKeyCode}</dd>
          <dt>
            <span id="preferredGreeting">Preferred Greeting</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.preferredGreeting}</dd>
          <dt>
            <span id="preferredGreetingDesignation">Preferred Greeting Designation</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.preferredGreetingDesignation}</dd>
          <dt>
            <span id="preferredPrefix">Preferred Prefix</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.preferredPrefix}</dd>
          <dt>
            <span id="preferredSuffix">Preferred Suffix</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.preferredSuffix}</dd>
          <dt>
            <span id="timeBasedGreetings">Time Based Greetings</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.timeBasedGreetings ? 'true' : 'false'}</dd>
          <dt>
            <span id="sloganBasedGreeting">Slogan Based Greeting</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.sloganBasedGreeting ? 'true' : 'false'}</dd>
          <dt>
            <span id="addPrefix">Add Prefix</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.addPrefix ? 'true' : 'false'}</dd>
          <dt>
            <span id="addSuffix">Add Suffix</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.addSuffix ? 'true' : 'false'}</dd>
          <dt>
            <span id="preferredSignature">Preferred Signature</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.preferredSignature}</dd>
          <dt>
            <span id="preferredSignatureDesignation">Preferred Signature Designation</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.preferredSignatureDesignation}</dd>
          <dt>
            <span id="includeServiceDetails">Include Service Details</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.includeServiceDetails ? 'true' : 'false'}</dd>
          <dt>
            <span id="includeMessageOfTheDay">Include Message Of The Day</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.includeMessageOfTheDay ? 'true' : 'false'}</dd>
          <dt>
            <span id="includeTreasuryQuote">Include Treasury Quote</span>
          </dt>
          <dd>{salesReceiptEmailPersonaEntity.includeTreasuryQuote ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>
            {salesReceiptEmailPersonaEntity.createdAt ? (
              <TextFormat value={salesReceiptEmailPersonaEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifedAt">Last Modifed At</span>
          </dt>
          <dd>
            {salesReceiptEmailPersonaEntity.lastModifedAt ? (
              <TextFormat value={salesReceiptEmailPersonaEntity.lastModifedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Created By</dt>
          <dd>{salesReceiptEmailPersonaEntity.createdBy ? salesReceiptEmailPersonaEntity.createdBy.applicationIdentity : ''}</dd>
          <dt>Last Modified By</dt>
          <dd>{salesReceiptEmailPersonaEntity.lastModifiedBy ? salesReceiptEmailPersonaEntity.lastModifiedBy.applicationIdentity : ''}</dd>
          <dt>Contributor</dt>
          <dd>{salesReceiptEmailPersonaEntity.contributor ? salesReceiptEmailPersonaEntity.contributor.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/sales-receipt-email-persona" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sales-receipt-email-persona/${salesReceiptEmailPersonaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SalesReceiptEmailPersonaDetail;
