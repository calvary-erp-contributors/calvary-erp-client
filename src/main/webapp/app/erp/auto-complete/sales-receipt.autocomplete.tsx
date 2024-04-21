import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { getEntity, searchEntities } from '../sales-receipt/sales-receipt.reducer';
import { useAppDispatch } from 'app/config/store';
import { ISalesReceipt } from 'app/shared/model/sales-receipt.model';
import { AxiosResponse } from 'axios';

interface AutocompleteSearchSalesReceiptProps {
  onSelectEntity: (salesReceipt: ISalesReceipt) => void;
}

const AutocompleteSearchSalesReceipt: React.FC<AutocompleteSearchSalesReceiptProps> = ({ onSelectEntity }) => {
  const [selectedSalesReceipt, setSalesReceipt] = useState<ISalesReceipt | null>(null);

  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    try {
      // dispatch query to store
      const result = await dispatch(searchEntities({ query: inputValue }));
      const response = result.payload as AxiosResponse;

      return response.data.map((result: ISalesReceipt) => ({
        value: result,
        label: `Receipt # : ${result.id} | date: ${result.transactionDate} | dealer: ${result.dealer.name} | desc: ${result.description}`,
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

  const handleOptionSelect = (option: { value: ISalesReceipt; label: string }) => {
    setSalesReceipt(option.value);

    onSelectEntity(selectedSalesReceipt);
  };

  useEffect(() => {
    if (selectedSalesReceipt) {
      dispatch(getEntity(selectedSalesReceipt.id));
    }
  }, [selectedSalesReceipt]);

  return (
    <div>
      <div>Sales Receipt</div>
      <AsyncSelect
        value={
          selectedSalesReceipt
            ? {
                value: selectedSalesReceipt,
                label: `Receipt #: ${selectedSalesReceipt.id} | dealer: ${selectedSalesReceipt.dealer.name} | date: ${selectedSalesReceipt.transactionDate} | ${selectedSalesReceipt.description}`,
              }
            : null
        }
        onChange={handleOptionSelect}
        loadOptions={loadOptions}
        placeholder="Sales Receipt"
        styles={customStyles}
      />
    </div>
  );
};

export default AutocompleteSearchSalesReceipt;
