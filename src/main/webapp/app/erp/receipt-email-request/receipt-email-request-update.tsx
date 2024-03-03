import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { IReceiptEmailRequest } from 'app/shared/model/receipt-email-request.model';
import { getEntity, updateEntity, createEntity, reset } from './receipt-email-request.reducer';

export const ReceiptEmailRequestUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const receiptEmailRequestEntity = useAppSelector(state => state.receiptEmailRequest.entity);
  const loading = useAppSelector(state => state.receiptEmailRequest.loading);
  const updating = useAppSelector(state => state.receiptEmailRequest.updating);
  const updateSuccess = useAppSelector(state => state.receiptEmailRequest.updateSuccess);

  const handleClose = () => {
    navigate('/receipt-email-request' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getApplicationUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.timeOfRequisition = convertDateTimeToServer(values.timeOfRequisition);

    const entity = {
      ...receiptEmailRequestEntity,
      ...values,
      requestedBy: applicationUsers.find(it => it.id.toString() === values.requestedBy.toString()),
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
          timeOfRequisition: displayDefaultDateTime(),
        }
      : {
          ...receiptEmailRequestEntity,
          timeOfRequisition: convertDateTimeFromServer(receiptEmailRequestEntity.timeOfRequisition),
          requestedBy: receiptEmailRequestEntity?.requestedBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.receiptEmailRequest.home.createOrEditLabel" data-cy="ReceiptEmailRequestCreateUpdateHeading">
            Create or edit a Receipt Email Request
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
                <ValidatedField name="id" required readOnly id="receipt-email-request-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Time Of Requisition"
                id="receipt-email-request-timeOfRequisition"
                name="timeOfRequisition"
                data-cy="timeOfRequisition"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Upload Complete"
                id="receipt-email-request-uploadComplete"
                name="uploadComplete"
                data-cy="uploadComplete"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Number Of Updates"
                id="receipt-email-request-numberOfUpdates"
                name="numberOfUpdates"
                data-cy="numberOfUpdates"
                type="text"
              />
              <ValidatedField
                id="receipt-email-request-requestedBy"
                name="requestedBy"
                data-cy="requestedBy"
                label="Requested By"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/receipt-email-request" replace color="info">
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

export default ReceiptEmailRequestUpdate;
