import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITransactionItem } from 'app/shared/model/transaction-item.model';
import { getEntities as getTransactionItems } from '../transaction-item/transaction-item.reducer';
import { ISalesReceipt } from 'app/shared/model/sales-receipt.model';
import { getEntities as getSalesReceipts } from '../sales-receipt/sales-receipt.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transfer-item-entry.reducer';
import AutocompleteSearchSalesReceipt from 'app/erp/auto-complete/sales-receipt.autocomplete';
import TransactionItemAutocomplete from 'app/erp/auto-complete/transaction-items.autocomplete';

export const TransferItemEntryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const transactionItems = useAppSelector(state => state.transactionItem.entities);
  const salesReceipts = useAppSelector(state => state.salesReceipt.entities);
  const salesReceiptSelected = useAppSelector(state => state.salesReceipt.entity);
  const transferItemEntryEntity = useAppSelector(state => state.transferItemEntry.entity);
  const loading = useAppSelector(state => state.transferItemEntry.loading);
  const updating = useAppSelector(state => state.transferItemEntry.updating);
  const updateSuccess = useAppSelector(state => state.transferItemEntry.updateSuccess);

  const [selectedSalesReceipt, setSelectedSalesReceipt] = useState<ISalesReceipt>(null);
  const [selectedTransactionItem, setSelectedTransactionItem] = useState<ITransactionItem>(null);

  const handleClose = () => {
    navigate('/transfer-item-entry');
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
      ...transferItemEntryEntity,
      ...values,
      transactionItem: selectedTransactionItem,
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
          ...transferItemEntryEntity,
          transactionItem: transferItemEntryEntity?.transactionItem?.id,
          salesReceipt: transferItemEntryEntity?.salesReceipt?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.transferItemEntry.home.createOrEditLabel" data-cy="TransferItemEntryCreateUpdateHeading">
            Create or edit a Transfer Item Entry
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
                <ValidatedField name="id" required readOnly id="transfer-item-entry-id" label="ID" validate={{ required: true }} />
              ) : null}
              <AutocompleteSearchSalesReceipt onSelectEntity={handleAccountSelectedEvent} />
              <FormText>This field is required.</FormText>
              <TransactionItemAutocomplete onSelectEntity={handleTransactionItemSelectedEvent} />
              <ValidatedField
                label="Description"
                id="transfer-item-entry-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label="Item Amount"
                id="transfer-item-entry-itemAmount"
                name="itemAmount"
                data-cy="itemAmount"
                type="text"
                /*validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}*/
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/transfer-item-entry" replace color="info">
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

export default TransferItemEntryUpdate;
