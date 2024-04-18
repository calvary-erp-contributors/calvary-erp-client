import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from '../application-user/application-user.reducer';
import { IDealer } from 'app/shared/model/dealer.model';
import { getEntities as getDealers } from 'app/entities/dealer/dealer.reducer';
import { ISalesReceiptEmailPersona } from 'app/shared/model/sales-receipt-email-persona.model';
import { getEntity, updateEntity, createEntity, reset } from './sales-receipt-email-persona.reducer';
import { uuidv7 } from 'uuidv7';
import { convertUUIDFromServer, defaultUUID } from 'app/shared/util/uuid-util';
import DealerAutocomplete from 'app/erp/auto-complete/dealer.autocomplete';

export const SalesReceiptEmailPersonaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const salesReceiptEmailPersonaEntity = useAppSelector(state => state.salesReceiptEmailPersona.entity);
  const loading = useAppSelector(state => state.salesReceiptEmailPersona.loading);
  const updating = useAppSelector(state => state.salesReceiptEmailPersona.updating);
  const updateSuccess = useAppSelector(state => state.salesReceiptEmailPersona.updateSuccess);

  const [selectedContributor, setSelectedContributor] = useState<IDealer | null>(null);
  const contributorSelected = useAppSelector(state => state.dealer.entity);

  const handleClose = () => {
    navigate('/sales-receipt-email-persona' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getApplicationUsers({}));
    dispatch(getDealers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.lastModifedAt = convertDateTimeToServer(values.lastModifedAt);

    const entity = {
      ...salesReceiptEmailPersonaEntity,
      ...values,
      createdBy: applicationUsers.find(it => it.id.toString() === values.createdBy.toString()),
      lastModifiedBy: applicationUsers.find(it => it.id.toString() === values.lastModifiedBy.toString()),
      contributor: selectedContributor,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const handleDealerSelectedEvent = pickedDealer => {
    if (pickedDealer) {
      setSelectedContributor(pickedDealer);
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdAt: displayDefaultDateTime(),
          lastModifedAt: displayDefaultDateTime(),
          emailIdentifier: defaultUUID(),
          languageKeyCode: 'en',
          blindCopyEmail: false,
          clearCopyEmail: false,
          preferredGreeting: 'Dear',
          preferredSignature: 'Fellow servants,',
          preferredSignatureDesignation: 'Treasury Team',
        }
      : {
          ...salesReceiptEmailPersonaEntity,
          createdAt: convertDateTimeFromServer(salesReceiptEmailPersonaEntity.createdAt),
          lastModifedAt: convertDateTimeFromServer(salesReceiptEmailPersonaEntity.lastModifedAt),
          createdBy: salesReceiptEmailPersonaEntity?.createdBy?.id,
          lastModifiedBy: salesReceiptEmailPersonaEntity?.lastModifiedBy?.id,
          contributor: salesReceiptEmailPersonaEntity?.contributor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="calvaryErpApp.salesReceiptEmailPersona.home.createOrEditLabel" data-cy="SalesReceiptEmailPersonaCreateUpdateHeading">
            Create or edit a Sales Receipt Email Persona
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
                <ValidatedField name="id" required readOnly id="sales-receipt-email-persona-id" label="ID" validate={{ required: true }} />
              ) : null}
              {/*<ValidatedField
                id="sales-receipt-email-persona-contributor"
                name="contributor"
                data-cy="contributor"
                label="Contributor"
                type="select"
              >
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>*/}
              <DealerAutocomplete onSelectInstance={handleDealerSelectedEvent} />
              <ValidatedField
                label="Preferred Greeting Designation"
                id="sales-receipt-email-persona-preferredGreetingDesignation"
                name="preferredGreetingDesignation"
                data-cy="preferredGreetingDesignation"
                type="text"
              />
              <ValidatedField
                label="Preferred Signature Designation"
                id="sales-receipt-email-persona-preferredSignatureDesignation"
                name="preferredSignatureDesignation"
                data-cy="preferredSignatureDesignation"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Email Identifier"
                id="sales-receipt-email-persona-emailIdentifier"
                name="emailIdentifier"
                data-cy="emailIdentifier"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Main Email"
                id="sales-receipt-email-persona-mainEmail"
                name="mainEmail"
                data-cy="mainEmail"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Clear Copy Email"
                id="sales-receipt-email-persona-clearCopyEmail"
                name="clearCopyEmail"
                data-cy="clearCopyEmail"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Blind Copy Email"
                id="sales-receipt-email-persona-blindCopyEmail"
                name="blindCopyEmail"
                data-cy="blindCopyEmail"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Language Key Code"
                id="sales-receipt-email-persona-languageKeyCode"
                name="languageKeyCode"
                data-cy="languageKeyCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  pattern: { value: /(^[a-z][a-z]*$)/, message: 'This field should follow pattern for (^[a-z][a-z]*$.' },
                }}
              />
              <ValidatedField
                label="Preferred Greeting"
                id="sales-receipt-email-persona-preferredGreeting"
                name="preferredGreeting"
                data-cy="preferredGreeting"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Preferred Prefix"
                id="sales-receipt-email-persona-preferredPrefix"
                name="preferredPrefix"
                data-cy="preferredPrefix"
                type="text"
              />
              <ValidatedField
                label="Preferred Suffix"
                id="sales-receipt-email-persona-preferredSuffix"
                name="preferredSuffix"
                data-cy="preferredSuffix"
                type="text"
              />
              <ValidatedField
                label="Time Based Greetings"
                id="sales-receipt-email-persona-timeBasedGreetings"
                name="timeBasedGreetings"
                data-cy="timeBasedGreetings"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Slogan Based Greeting"
                id="sales-receipt-email-persona-sloganBasedGreeting"
                name="sloganBasedGreeting"
                data-cy="sloganBasedGreeting"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Add Prefix"
                id="sales-receipt-email-persona-addPrefix"
                name="addPrefix"
                data-cy="addPrefix"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Add Suffix"
                id="sales-receipt-email-persona-addSuffix"
                name="addSuffix"
                data-cy="addSuffix"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Preferred Signature"
                id="sales-receipt-email-persona-preferredSignature"
                name="preferredSignature"
                data-cy="preferredSignature"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Include Service Details"
                id="sales-receipt-email-persona-includeServiceDetails"
                name="includeServiceDetails"
                data-cy="includeServiceDetails"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Include Message Of The Day"
                id="sales-receipt-email-persona-includeMessageOfTheDay"
                name="includeMessageOfTheDay"
                data-cy="includeMessageOfTheDay"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Include Treasury Quote"
                id="sales-receipt-email-persona-includeTreasuryQuote"
                name="includeTreasuryQuote"
                data-cy="includeTreasuryQuote"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Created At"
                id="sales-receipt-email-persona-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Last Modifed At"
                id="sales-receipt-email-persona-lastModifedAt"
                name="lastModifedAt"
                data-cy="lastModifedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sales-receipt-email-persona" replace color="info">
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

export default SalesReceiptEmailPersonaUpdate;
