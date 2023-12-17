import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { getEntity, searchEntities } from '../sales-receipt/sales-receipt.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ISalesReceipt } from 'app/shared/model/sales-receipt.model';

interface AutocompleteSearchSalesReceiptProps {
  onSelectEntity: (salesReceipt: ISalesReceipt) => void;
}

const AutocompleteSearchSalesReceipt: React.FC<AutocompleteSearchSalesReceiptProps> = ({ onSelectEntity }) => {
  const salesReceipts = useAppSelector(state => state.salesReceipt.entities);

  const [selectedSalesReceipt, setSalesReceipt] = useState<ISalesReceipt | null>(null);

  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    try {
      // dispatch query to store
      dispatch(searchEntities({ query: inputValue }));

      // fetch updated data list from store. I know, it's quite counter-intuitive
      return salesReceipts.map((result: ISalesReceipt) => ({
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
