import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITransferItem } from 'app/shared/model/transfer-item.model';
import { getEntities as getTransferItems } from 'app/entities/transfer-item/transfer-item.reducer';
import { ISalesReceipt } from 'app/shared/model/sales-receipt.model';
import { getEntities as getSalesReceipts } from '../sales-receipt/sales-receipt.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transfer-item-entry.reducer';
import AutocompleteSearchSalesReceipt from 'app/erp/auto-complete/sales-receipt.autocomplete';
import TransactionItemAutocomplete from 'app/erp/auto-complete/transaction-items.autocomplete';
import TransferItemAutocomplete from 'app/erp/auto-complete/transfer-items.autocomplete';

export const TransferItemEntryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  // const transactionItems = useAppSelector(state => state.transactionItem.entities);
  // const salesReceipts = useAppSelector(state => state.salesReceipt.entities);
  const transferItems = useAppSelector(state => state.transferItem.entities);
  const salesReceiptSelected = useAppSelector(state => state.salesReceipt.entity);
  const transferItemSelected = useAppSelector(state => state.transferItem.entity);
  const transferItemEntryEntity = useAppSelector(state => state.transferItemEntry.entity);
  const loading = useAppSelector(state => state.transferItemEntry.loading);
  const updating = useAppSelector(state => state.transferItemEntry.updating);
  const updateSuccess = useAppSelector(state => state.transferItemEntry.updateSuccess);

  const [selectedSalesReceipt, setSelectedSalesReceipt] = useState<ISalesReceipt>(null);
  const [selectedTransferItem, setSelectedTransferItem] = useState<ITransferItem>(null);

  const handleClose = () => {
    navigate('/transfer-item-entry');
  };

  const handleAccountSelectedEvent = pickedAccount => {
    if (pickedAccount) {
      setSelectedSalesReceipt(pickedAccount);
    }
  };

  const handleTransferItemSelectedEvent = pickedItem => {
    if (pickedItem) {
      setSelectedTransferItem(pickedItem);
    }
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getTransferItems({}));
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
      transferItem: transferItemSelected,
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
          transferItem: transferItemEntryEntity?.transferItem?.id,
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
              <TransferItemAutocomplete onSelectEntity={handleTransferItemSelectedEvent} />
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
