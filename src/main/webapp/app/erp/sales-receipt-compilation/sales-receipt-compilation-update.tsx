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
import { ISalesReceiptCompilation } from 'app/shared/model/sales-receipt-compilation.model';
import { getEntity, updateEntity, createEntity, reset } from './sales-receipt-compilation.reducer';

export const SalesReceiptCompilationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const salesReceiptCompilationEntity = useAppSelector(state => state.salesReceiptCompilation.entity);
  const loading = useAppSelector(state => state.salesReceiptCompilation.loading);
  const updating = useAppSelector(state => state.salesReceiptCompilation.updating);
  const updateSuccess = useAppSelector(state => state.salesReceiptCompilation.updateSuccess);

  const handleClose = () => {
    navigate('/sales-receipt-compilation' + location.search);
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
    values.timeOfCompilation = convertDateTimeToServer(values.timeOfCompilation);

    const entity = {
      ...salesReceiptCompilationEntity,
      ...values,
      compiledBy: applicationUsers.find(it => it.id.toString() === values.compiledBy.toString()),
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
          timeOfCompilation: displayDefaultDateTime(),
        }
      : {
          ...salesReceiptCompilationEntity,
          timeOfCompilation: convertDateTimeFromServer(salesReceiptCompilationEntity.timeOfCompilation),
          compiledBy: salesReceiptCompilationEntity?.compiledBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.salesReceiptCompilation.home.createOrEditLabel" data-cy="SalesReceiptCompilationCreateUpdateHeading">
            Create or edit a Sales Receipt Compilation
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
                <ValidatedField name="id" required readOnly id="sales-receipt-compilation-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Time Of Compilation"
                id="sales-receipt-compilation-timeOfCompilation"
                name="timeOfCompilation"
                data-cy="timeOfCompilation"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Compilation Identifier"
                id="sales-receipt-compilation-compilationIdentifier"
                name="compilationIdentifier"
                data-cy="compilationIdentifier"
                type="text"
              />
              <ValidatedField
                label="Receipts Compiled"
                id="sales-receipt-compilation-receiptsCompiled"
                name="receiptsCompiled"
                data-cy="receiptsCompiled"
                type="text"
              />
              <ValidatedField
                id="sales-receipt-compilation-compiledBy"
                name="compiledBy"
                data-cy="compiledBy"
                label="Compiled By"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sales-receipt-compilation" replace color="info">
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

export default SalesReceiptCompilationUpdate;
