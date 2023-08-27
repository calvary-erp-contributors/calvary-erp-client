import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import {getEntity, deleteEntity, postTransaction} from './account-transaction.reducer';

export const AccountTransactionDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const accountTransactionEntity = useAppSelector(state => state.accountTransaction.entity);
  const updateSuccess = useAppSelector(state => state.accountTransaction.updateSuccess);

  const handleClose = () => {
    navigate('/account-transaction' + location.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmPosting = () => {
    dispatch(postTransaction(accountTransactionEntity));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="accountTransactionPostingDialogHeading">
        <Translate contentKey="entity.post.title">Confirm posting operation</Translate>
      </ModalHeader>
      <ModalBody id="calvaryErpApp.accountTransaction.delete.question">
        <Translate contentKey="calvaryErp.accountTransaction.post.question" interpolate={{ id: accountTransactionEntity.id }}>
          Are you sure you want to post this AccountTransaction?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-accountTransaction" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmPosting}>
          <FontAwesomeIcon icon="signs-post" />
          &nbsp;
          <Translate contentKey="entity.action.post">Posting</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AccountTransactionDeleteDialog;
