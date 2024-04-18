import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './application-user.reducer';

export const ApplicationUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const applicationUserEntity = useAppSelector(state => state.applicationUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="applicationUserDetailsHeading">Application User</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{applicationUserEntity.id}</dd>
          <dt>
            <span id="applicationIdentity">Application Identity</span>
          </dt>
          <dd>{applicationUserEntity.applicationIdentity}</dd>
          <dt>
            <span id="lastLoginTime">Last Login Time</span>
          </dt>
          <dd>
            {applicationUserEntity.lastLoginTime ? (
              <TextFormat value={applicationUserEntity.lastLoginTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="timeOfCreation">Time Of Creation</span>
          </dt>
          <dd>
            {applicationUserEntity.timeOfCreation ? (
              <TextFormat value={applicationUserEntity.timeOfCreation} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastTimeOfModification">Last Time Of Modification</span>
          </dt>
          <dd>
            {applicationUserEntity.lastTimeOfModification ? (
              <TextFormat value={applicationUserEntity.lastTimeOfModification} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="userIdentifier">User Identifier</span>
          </dt>
          <dd>{applicationUserEntity.userIdentifier}</dd>
          <dt>Created By</dt>
          <dd>{applicationUserEntity.createdBy ? applicationUserEntity.createdBy.applicationIdentity : ''}</dd>
          <dt>Last Modified By</dt>
          <dd>{applicationUserEntity.lastModifiedBy ? applicationUserEntity.lastModifiedBy.applicationIdentity : ''}</dd>
          <dt>System Identity</dt>
          <dd>{applicationUserEntity.systemIdentity ? applicationUserEntity.systemIdentity.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/application-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/application-user/${applicationUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ApplicationUserDetail;
