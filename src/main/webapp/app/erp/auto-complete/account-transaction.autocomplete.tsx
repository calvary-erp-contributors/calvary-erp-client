import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios, { AxiosResponse } from 'axios';
import { translate } from 'react-jhipster';
import { getEntity } from 'app/erp/transaction-account-management/account-transaction/account-transaction.reducer';
import { useAppDispatch } from 'app/config/store';
import { IAccountTransaction } from 'app/shared/model/account-transaction.model';

const apiSearchUrl = 'api/app/_search/account-transactions';

interface AccountTransactionAutocompleteProps {
  onSelectTransaction: (account: IAccountTransaction) => void;
  initialSelection: IAccountTransaction;
}

const AccountTransactionAutocomplete: React.FC<AccountTransactionAutocompleteProps> = ({ onSelectTransaction, initialSelection = {} }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<IAccountTransaction | null>(initialSelection);
  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    const requestUrl = `${apiSearchUrl}?query=${inputValue}`;
    try {
      const response = await axios.get(requestUrl);
      return response.data.map((result: IAccountTransaction) => ({
        value: result,
        label: result.referenceNumber,
      }));
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '2px solid #3498db' : '2px solid #ced4da',
      boxShadow: state.isFocused ? '0 0 3px rgba(52, 152, 219, 0.5)' : 'none',
      '&:hover': {
        border: '2px solid #3498db',
      },
    }),
  };

  const handleOptionSelect = (option: { value: IAccountTransaction; label: string }) => {
    setSelectedTransaction(option.value);

    onSelectTransaction(selectedTransaction);
  };

  useEffect(() => {
    // Fetch complete data for initial selected personas
    const fetchDataForInitialSelection = async () => {
      const result = await dispatch(getEntity(initialSelection.id));
      const response = result.payload as AxiosResponse;

      setSelectedTransaction(response.data);
    };

    fetchDataForInitialSelection();
  }, []);

  useEffect(() => {
    if (selectedTransaction) {
      dispatch(getEntity(selectedTransaction.id));
    }
  }, [selectedTransaction]);

  return (
    <div>
      <div> Transaction </div>
      <AsyncSelect
        value={
          selectedTransaction
            ? {
                value: selectedTransaction,
                label: ` No. ${selectedTransaction.referenceNumber} Date: ${selectedTransaction.transactionDate} Desc: ${selectedTransaction.description}`,
              }
            : null
        }
        onChange={handleOptionSelect}
        loadOptions={loadOptions}
        placeholder={translate('calvaryErp.transactionEntry.accountTransactionPlaceholder')}
        styles={customStyles}
      />
    </div>
  );
};

export default AccountTransactionAutocomplete;
