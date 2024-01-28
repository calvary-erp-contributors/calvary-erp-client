import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITransactionClass } from 'app/shared/model/transaction-class.model';
import { getEntities as getTransactionClasses } from 'app/entities/transaction-class/transaction-class.reducer';
import { IDealer } from 'app/shared/model/dealer.model';
import { getEntities as getDealers } from 'app/entities/dealer/dealer.reducer';
import { ISalesReceiptTitle } from 'app/shared/model/sales-receipt-title.model';
import { getEntities as getSalesReceiptTitles } from 'app/entities/sales-receipt-title/sales-receipt-title.reducer';
import { ISalesReceipt, SalesReceipt } from 'app/shared/model/sales-receipt.model';
import { getEntity, updateEntity, createEntity, reset } from './sales-receipt.reducer';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
// import { useNavigate } from 'react-router-dom';

export const SalesReceiptUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const transactionClasses = useAppSelector(state => state.transactionClass.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const salesReceiptTitles = useAppSelector(state => state.salesReceiptTitle.entities);
  const salesReceiptEntity = useAppSelector(state => state.salesReceipt.entity);
  const loading = useAppSelector(state => state.salesReceipt.loading);
  const updating = useAppSelector(state => state.salesReceipt.updating);
  const updateSuccess = useAppSelector(state => state.salesReceipt.updateSuccess);
  // const history = useHistory();

  const handleClose = () => {
    navigate('/sales-receipt' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTransactionClasses({}));
    dispatch(getDealers({}));
    dispatch(getSalesReceiptTitles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...salesReceiptEntity,
      ...values,
      transactionClass: transactionClasses.find(it => it.id.toString() === values.transactionClass.toString()),
      dealer: dealers.find(it => it.id.toString() === values.dealer.toString()),
      salesReceiptTitle: salesReceiptTitles.find(it => it.id.toString() === values.salesReceiptTitle.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  // const proposeEntity = values => {
  //   const entity = {
  //     ...salesReceiptEntity,
  //     ...values,
  //     transactionClass: transactionClasses.find(it => it.id.toString() === values.transactionClass.toString()),
  //     dealer: dealers.find(it => it.id.toString() === values.dealer.toString()),
  //     salesReceiptTitle: salesReceiptTitles.find(it => it.id.toString() === values.salesReceiptTitle.toString()),
  //   };
  //
  //   if (isNew) {
  //     dispatch(createEntity(entity));
  //     // navigate('/transfer-item-entry');
  //   } else {
  //     dispatch(updateEntity(entity));
  //     // navigate('/transfer-item-entry');
  //   }
  // };

  const proposeEntity = values => {
    const entity = {
      ...salesReceiptEntity,
      ...values,
      transactionClass: values.transactionClass
        ? transactionClasses.find(it => it.id.toString() === values.transactionClass.toString())
        : null,
      dealer: values.dealer ? dealers.find(it => it.id.toString() === values.dealer.toString()) : null,
      salesReceiptTitle: values.salesReceiptTitle
        ? salesReceiptTitles.find(it => it.id.toString() === values.salesReceiptTitle.toString())
        : null,
    };

    if (isNew) {
      dispatch(createEntity(entity));
      navigate('/transfer-item-entry');
    } else {
      dispatch(updateEntity(entity));
      navigate('/transfer-item-entry');
    }
  };

  // const entity = {
  //   ...salesReceiptEntity,
  //   ...values,
  //   transactionClass: values.transactionClass ? serializeWithoutCircular(values.transactionClass) : null,
  //   dealer: values.dealer ? serializeWithoutCircular(values.dealer) : null,
  //   salesReceiptTitle: values.salesReceiptTitle ? serializeWithoutCircular(values.salesReceiptTitle) : null,
  // };

  const defaultValues = () =>
    isNew
      ? {
          ...new SalesReceipt(),
          transactionDate: dayjs().format(APP_LOCAL_DATE_FORMAT),
        }
      : {
          ...salesReceiptEntity,
          transactionClass: salesReceiptEntity?.transactionClass?.id,
          dealer: salesReceiptEntity?.dealer?.id,
          salesReceiptTitle: salesReceiptEntity?.salesReceiptTitle?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.salesReceipt.home.createOrEditLabel" data-cy="SalesReceiptCreateUpdateHeading">
            Create or edit a Sales Receipt
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
                <ValidatedField name="id" required readOnly id="sales-receipt-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Transaction Date"
                id="sales-receipt-transactionDate"
                name="transactionDate"
                data-cy="transactionDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="sales-receipt-salesReceiptTitle"
                name="salesReceiptTitle"
                data-cy="salesReceiptTitle"
                label="Sales Receipt Title"
                type="select"
                required
              >
                <option value="" key="0" />
                {salesReceiptTitles
                  ? salesReceiptTitles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.receiptTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="sales-receipt-transactionClass"
                name="transactionClass"
                data-cy="transactionClass"
                label="Transaction Class"
                type="select"
              >
                <option value="" key="0" />
                {transactionClasses
                  ? transactionClasses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.className}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="sales-receipt-dealer" name="dealer" data-cy="dealer" label="Dealer" type="select" required>
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField label="Description" id="sales-receipt-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Has Been Emailed"
                id="sales-receipt-hasBeenEmailed"
                name="hasBeenEmailed"
                data-cy="hasBeenEmailed"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Has Been Proposed"
                id="sales-receipt-hasBeenProposed"
                name="hasBeenProposed"
                data-cy="hasBeenProposed"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Should Be Emailed"
                id="sales-receipt-shouldBeEmailed"
                name="shouldBeEmailed"
                data-cy="shouldBeEmailed"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sales-receipt" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityProposeButton" onClick={proposeEntity} disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Propose
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SalesReceiptUpdate;
