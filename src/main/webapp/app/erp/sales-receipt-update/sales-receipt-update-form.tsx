import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { defaultValue, ISalesReceipt } from 'app/shared/model/sales-receipt.model';
import { IDealer } from 'app/shared/model/dealer.model';
import AutocompleteSearchTransactionAccount from 'app/erp/auto-complete/transaction-account.autocomplete';
import DealerAutocomplete from 'app/erp/auto-complete/dealer.autocomplete';
import TransactionItemAutocomplete from 'app/erp/auto-complete/transaction-items.autocomplete';
import dayjs from 'dayjs';

const SalesReceiptUpdateForm: React.FC = () => {
  const [selectedDealer, setSelectedDealer] = useState<IDealer | null>(null);

  const initialValues: ISalesReceipt = defaultValue;
  initialValues.transactionDate = dayjs().format('yyyy-MM-dd');

  const handleSubmit = (values: ISalesReceipt) => {
    // Handle form submission (Redux dispatch, API call, etc.)
    console.log(values);
  };

  const handleDealerSelectedEvent = pickedAccount => {
    if (pickedAccount) {
      setSelectedDealer(pickedAccount);
    }
  };

  const handleTransactionItemSelectedEvent = pickedAccount => {
    if (pickedAccount) {
      // TODO update transactionItemEntries ARRAY
    }
  };

  const handleTransferItemSelectedEvent = pickedAccount => {
    if (pickedAccount) {
      // TODO update transactionItemEntries ARRAY
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <h2>Sales Receipt</h2>
          <DealerAutocomplete onSelectInstance={handleDealerSelectedEvent} />
          &nbsp;
          <label htmlFor="date">Date:</label>
          <Field id="date" name="date" type="date" />
          <FieldArray name="transactionItemEntries">
            {({ push, remove }) => (
              <div>
                <h3>Transaction Item Entries</h3>
                {values.transactionItemEntries.map((entry, index) => (
                  <div key={index}>
                    {/*<label htmlFor={`transactionItemEntries.${index}.transactionItem.particulars`}>Particulars:</label>
                    <Field name={`transactionItemEntries.${index}.transactionItem.particulars`} type="text" />*/}

                    <TransactionItemAutocomplete onSelectEntity={handleTransactionItemSelectedEvent} />

                    <label htmlFor={`transactionItemEntries.${index}.amount`}>Amount:</label>
                    <Field name={`transactionItemEntries.${index}.amount`} type="number" />

                    <button type="button" onClick={() => remove(index)}>
                      Remove Entry
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      id: Date.now(),
                      transactionItem: { id: Date.now(), particulars: '' },
                      amount: 0,
                    })
                  }
                >
                  Add Entry
                </button>
              </div>
            )}
          </FieldArray>
          <FieldArray name="transferItemEntries">
            {({ push, remove }) => (
              <div>
                <h3>Transfer Item Entries</h3>
                {values.transferItemEntries.map((entry, index) => (
                  <div key={index}>
                    {/*<label htmlFor={`transactionItemEntries.${index}.transactionItem.particulars`}>Particulars:</label>
                    <Field name={`transactionItemEntries.${index}.transactionItem.particulars`} type="text" />*/}

                    <TransactionItemAutocomplete onSelectEntity={handleTransferItemSelectedEvent} />

                    <label htmlFor={`transferItemEntries.${index}.amount`}>Amount:</label>
                    <Field name={`transferItemEntries.${index}.amount`} type="number" />
                    <button type="button" onClick={() => remove(index)}>
                      Remove Entry
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      id: Date.now(),
                      transactionItem: { id: Date.now(), particulars: '' },
                      amount: 0,
                    })
                  }
                >
                  Add Entry
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default SalesReceiptUpdateForm;
