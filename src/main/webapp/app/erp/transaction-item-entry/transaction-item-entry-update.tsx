import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITransactionItem } from 'app/shared/model/transaction-item.model';
import { getEntities as getTransactionItems } from 'app/entities/transaction-item/transaction-item.reducer';
import { ISalesReceipt } from 'app/shared/model/sales-receipt.model';
import { getEntities as getSalesReceipts } from 'app/entities/sales-receipt/sales-receipt.reducer';
import { ITransactionItemEntry } from 'app/shared/model/transaction-item-entry.model';
import { getEntity, updateEntity, createEntity, reset } from './transaction-item-entry.reducer';
import AutocompleteSearchSalesReceipt from 'app/erp/auto-complete/sales-receipt.autocomplete';
import TransactionItemAutocomplete from 'app/erp/auto-complete/transaction-items.autocomplete';

export const TransactionItemEntryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const transactionItems = useAppSelector(state => state.transactionItem.entities);
  const salesReceipts = useAppSelector(state => state.salesReceipt.entities);
  const salesReceiptSelected = useAppSelector(state => state.salesReceipt.entity);
  const transactionItemSelected = useAppSelector(state => state.transactionItem.entity);
  const transactionItemEntryEntity = useAppSelector(state => state.transactionItemEntry.entity);
  const loading = useAppSelector(state => state.transactionItemEntry.loading);
  const updating = useAppSelector(state => state.transactionItemEntry.updating);
  const updateSuccess = useAppSelector(state => state.transactionItemEntry.updateSuccess);

  const [selectedSalesReceipt, setSelectedSalesReceipt] = useState<ISalesReceipt>(null);
  const [selectedTransactionItem, setSelectedTransactionItem] = useState<ITransactionItem>(null);

  const handleClose = () => {
    navigate('/transaction-item-entry');
  };

  const handleAccountSelectedEvent = pickedAccount => {
    if (pickedAccount) {
      setSelectedSalesReceipt(pickedAccount);
    }
  };

  const handleTransactionItemSelectedEvent = pickedItem => {
    if (pickedItem) {
      setSelectedTransactionItem(pickedItem);
    }
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getTransactionItems({}));
    dispatch(getSalesReceipts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...transactionItemEntryEntity,
      ...values,
      transactionItem: transactionItemSelected,
      salesReceipt: salesReceiptSelected,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...transactionItemEntryEntity,
          transactionItem: transactionItemEntryEntity?.transactionItem?.id,
          salesReceipt: salesReceiptSelected,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.transactionItemEntry.home.createOrEditLabel" data-cy="TransactionItemEntryCreateUpdateHeading">
            Create or edit a Transaction Item Entry
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
                <ValidatedField name="id" required readOnly id="transaction-item-entry-id" label="ID" validate={{ required: true }} />
              ) : null}
              <AutocompleteSearchSalesReceipt onSelectEntity={handleAccountSelectedEvent} />
              <TransactionItemAutocomplete onSelectEntity={handleTransactionItemSelectedEvent} />
              <ValidatedField
                label="Description"
                id="transaction-item-entry-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label="Item Amount"
                id="transaction-item-entry-itemAmount"
                name="itemAmount"
                data-cy="itemAmount"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/transaction-item-entry" replace color="info">
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

export default TransactionItemEntryUpdate;
