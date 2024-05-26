import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios, { AxiosResponse } from 'axios';
import { ITransactionAccount } from 'app/shared/model/transaction-account.model';
import { translate } from 'react-jhipster';
import { useAppDispatch } from 'app/config/store';
import { getEntity } from 'app/erp/transaction-account-management/transaction-account/transaction-account.reducer';
import { getEntity as getTransactionCurrencyEntity } from 'app/erp/transaction-account-management/transaction-currency/transaction-currency.reducer';
import { getEntity as getTransactionAccountType } from 'app/erp/transaction-account-management/transaction-account-type/transaction-account-type.reducer';
import { ITransactionCurrency } from 'app/shared/model/transaction-currency.model';
import { ITransactionAccountType } from 'app/shared/model/transaction-account-type.model';

const apiSearchUrl = 'api/app/_search/transaction-accounts';

interface AutocompleteSearchTransactionAccountProps {
  onSelectAccount: (account: ITransactionAccount) => void;
  initialSelection: ITransactionAccount;
}

const AutocompleteSearchTransactionAccount: React.FC<AutocompleteSearchTransactionAccountProps> = ({
  onSelectAccount,
  initialSelection = {},
}) => {
  const [selectedAccount, setSelectedAccount] = useState<ITransactionAccount | null>(initialSelection);
  const [selectedParentAccount, setSelectedParentAccount] = useState<ITransactionAccount | null>(null);
  const [selectedAccountType, setSelectedAccountType] = useState<ITransactionAccountType | null>(null);
  const [selectedTransactionCurrency, setSelectedTransactionCurrency] = useState<ITransactionCurrency | null>(null);
  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    const requestUrl = `${apiSearchUrl}?query=${inputValue}`;
    try {
      const response = await axios.get(requestUrl);
      return response.data.map((result: ITransactionAccount) => ({
        value: result,
        label: result.accountName,
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

  const handleOptionSelect = (option: { value: ITransactionAccount; label: string }) => {
    setSelectedAccount(option.value);

    onSelectAccount(selectedAccount);
  };

  useEffect(() => {
    // Fetch complete data for initial selected personas
    const fetchDataForInitialSelection = async () => {
      const result = await dispatch(getEntity(initialSelection.id));
      const response = result.payload as AxiosResponse;

      setSelectedAccount(response.data);

      // parent account
      const resultParent = await dispatch(getEntity(response.data.parent.id));
      const responseParent = resultParent.payload as AxiosResponse;

      setSelectedParentAccount(responseParent.data);

      // transaction currency
      const transactionCurrency = await dispatch(getTransactionCurrencyEntity(response.data.transactionCurrency.id));
      const transactionCurrencyResponse = transactionCurrency.payload as AxiosResponse;

      setSelectedTransactionCurrency(transactionCurrencyResponse.data);

      // transaction account type
      const transactionAccountType = await dispatch(getTransactionAccountType(response.data.transactionAccountType.id));
      const transactionAccountTypeResponse = transactionAccountType.payload as AxiosResponse;

      setSelectedAccountType(transactionAccountTypeResponse.data);
    };

    fetchDataForInitialSelection();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      dispatch(getEntity(selectedAccount.id));
    }
  }, [selectedAccount]);

  return (
    <div>
      <div>Account</div>
      <AsyncSelect
        value={
          selectedAccount
            ? {
                value: selectedAccount,
                label: `No. ${selectedAccount.accountNumber} | Name: ${selectedAccount.accountName}`,
              }
            : null
        }
        onChange={handleOptionSelect}
        loadOptions={loadOptions}
        placeholder={translate('calvaryErp.transactionEntry.transactionAccountPlaceholder')}
        styles={customStyles}
      />
    </div>
  );
};

export default AutocompleteSearchTransactionAccount;
