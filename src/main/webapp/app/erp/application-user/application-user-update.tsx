import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntity, updateEntity, createEntity, reset } from './application-user.reducer';

export const ApplicationUserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const applicationUserEntity = useAppSelector(state => state.applicationUser.entity);
  const loading = useAppSelector(state => state.applicationUser.loading);
  const updating = useAppSelector(state => state.applicationUser.updating);
  const updateSuccess = useAppSelector(state => state.applicationUser.updateSuccess);

  const handleClose = () => {
    navigate('/application-user');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getApplicationUsers({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.lastLoginTime = convertDateTimeToServer(values.lastLoginTime);
    values.timeOfCreation = convertDateTimeToServer(values.timeOfCreation);
    values.lastTimeOfModification = convertDateTimeToServer(values.lastTimeOfModification);

    const entity = {
      ...applicationUserEntity,
      ...values,
      createdBy: applicationUsers.find(it => it.id.toString() === values.createdBy.toString()),
      lastModifiedBy: applicationUsers.find(it => it.id.toString() === values.lastModifiedBy.toString()),
      systemIdentity: users.find(it => it.id.toString() === values.systemIdentity.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          lastLoginTime: displayDefaultDateTime(),
          timeOfCreation: displayDefaultDateTime(),
          lastTimeOfModification: displayDefaultDateTime(),
        }
      : {
          ...applicationUserEntity,
          lastLoginTime: convertDateTimeFromServer(applicationUserEntity.lastLoginTime),
          timeOfCreation: convertDateTimeFromServer(applicationUserEntity.timeOfCreation),
          lastTimeOfModification: convertDateTimeFromServer(applicationUserEntity.lastTimeOfModification),
          createdBy: applicationUserEntity?.createdBy?.id,
          lastModifiedBy: applicationUserEntity?.lastModifiedBy?.id,
          systemIdentity: applicationUserEntity?.systemIdentity?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.applicationUser.home.createOrEditLabel" data-cy="ApplicationUserCreateUpdateHeading">
            Create or edit a Application User
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="application-user-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Application Identity"
                id="application-user-applicationIdentity"
                name="applicationIdentity"
                data-cy="applicationIdentity"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Last Login Time"
                id="application-user-lastLoginTime"
                name="lastLoginTime"
                data-cy="lastLoginTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Time Of Creation"
                id="application-user-timeOfCreation"
                name="timeOfCreation"
                data-cy="timeOfCreation"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Last Time Of Modification"
                id="application-user-lastTimeOfModification"
                name="lastTimeOfModification"
                data-cy="lastTimeOfModification"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="User Identifier"
                id="application-user-userIdentifier"
                name="userIdentifier"
                data-cy="userIdentifier"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="application-user-createdBy" name="createdBy" data-cy="createdBy" label="Created By" type="select">
                <option value="" key="0" />
                {applicationUsers
                  ? applicationUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.applicationIdentity}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="application-user-lastModifiedBy"
                name="lastModifiedBy"
                data-cy="lastModifiedBy"
                label="Last Modified By"
                type="select"
              >
                <option value="" key="0" />
                {applicationUsers
                  ? applicationUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.applicationIdentity}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="application-user-systemIdentity"
                name="systemIdentity"
                data-cy="systemIdentity"
                label="System Identity"
                type="select"
                required
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/application-user" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationUserUpdate;
