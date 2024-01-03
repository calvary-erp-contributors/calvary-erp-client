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
import { ISalesReceiptProposal } from 'app/shared/model/sales-receipt-proposal.model';
import { getEntity, updateEntity, createEntity, reset } from './sales-receipt-proposal.reducer';

export const SalesReceiptProposalUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const salesReceiptProposalEntity = useAppSelector(state => state.salesReceiptProposal.entity);
  const loading = useAppSelector(state => state.salesReceiptProposal.loading);
  const updating = useAppSelector(state => state.salesReceiptProposal.updating);
  const updateSuccess = useAppSelector(state => state.salesReceiptProposal.updateSuccess);

  const handleClose = () => {
    navigate('/sales-receipt-proposal' + location.search);
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
    values.timeOfPosting = convertDateTimeToServer(values.timeOfPosting);

    const entity = {
      ...salesReceiptProposalEntity,
      ...values,
      proposedBy: applicationUsers.find(it => it.id.toString() === values.proposedBy.toString()),
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
          timeOfPosting: displayDefaultDateTime(),
        }
      : {
          ...salesReceiptProposalEntity,
          timeOfPosting: convertDateTimeFromServer(salesReceiptProposalEntity.timeOfPosting),
          proposedBy: salesReceiptProposalEntity?.proposedBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.salesReceiptProposal.home.createOrEditLabel" data-cy="SalesReceiptProposalCreateUpdateHeading">
            Create or edit a Sales Receipt Proposal
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
                <ValidatedField name="id" required readOnly id="sales-receipt-proposal-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Time Of Posting"
                id="sales-receipt-proposal-timeOfPosting"
                name="timeOfPosting"
                data-cy="timeOfPosting"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Posting Identifier"
                id="sales-receipt-proposal-postingIdentifier"
                name="postingIdentifier"
                data-cy="postingIdentifier"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Number Of Receipts Posted"
                id="sales-receipt-proposal-numberOfReceiptsPosted"
                name="numberOfReceiptsPosted"
                data-cy="numberOfReceiptsPosted"
                type="text"
              />
              <ValidatedField
                id="sales-receipt-proposal-proposedBy"
                name="proposedBy"
                data-cy="proposedBy"
                label="Proposed By"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sales-receipt-proposal" replace color="info">
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

export default SalesReceiptProposalUpdate;
