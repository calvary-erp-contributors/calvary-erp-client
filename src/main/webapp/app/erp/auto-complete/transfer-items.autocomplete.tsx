import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { getEntity as getTransferItem } from '../transfer-item/transfer-item.reducer';
import { useAppDispatch } from 'app/config/store';
import { ITransferItem } from 'app/shared/model/transfer-item.model';

const apiSearchUrl = 'api/_search/transfer-items';

interface TransferItemAutocompleteProps {
  onSelectEntity: (account: ITransferItem) => void;
}

const TransferItemAutocomplete: React.FC<TransferItemAutocompleteProps> = ({ onSelectEntity }) => {
  const [selectedEntity, setSelectedEntity] = useState<ITransferItem | null>(null);
  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    const requestUrl = `${apiSearchUrl}?query=${inputValue}`;
    try {
      const response = await axios.get(requestUrl);
      return response.data.map((result: ITransferItem) => ({
        value: result,
        label: result.itemName,
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

  const handleOptionSelect = (option: { value: ITransferItem; label: string }) => {
    setSelectedEntity(option.value);

    onSelectEntity(selectedEntity);
  };

  useEffect(() => {
    if (selectedEntity) {
      dispatch(getTransferItem(selectedEntity.id));
    }
  }, [selectedEntity]);

  return (
    <div>
      <div>Transfer Item</div>
      <AsyncSelect
        value={selectedEntity ? { value: selectedEntity, label: selectedEntity.itemName } : null}
        onChange={handleOptionSelect}
        loadOptions={loadOptions}
        placeholder={'Transfer Item'}
        styles={customStyles}
      />
    </div>
  );
};

export default TransferItemAutocomplete;
