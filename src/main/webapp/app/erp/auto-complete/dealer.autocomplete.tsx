import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { translate } from 'react-jhipster';
import { useAppDispatch } from 'app/config/store';
import { getEntity } from '../dealer/dealer.reducer';
import { IDealer } from 'app/shared/model/dealer.model';

const apiSearchUrl = 'api/app/_search/dealers';

interface DealerAutocompleteProps {
  onSelectInstance: (account: IDealer) => void;
}

const DealerAutocomplete: React.FC<DealerAutocompleteProps> = ({ onSelectInstance }) => {
  const [selectedDealer, setSelectedDealer] = useState<IDealer | null>(null);

  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    const requestUrl = `${apiSearchUrl}?query=${inputValue}`;
    try {
      const response = await axios.get(requestUrl);
      return response.data.map((result: IDealer) => ({
        value: result,
        label: result.name,
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

  const handleOptionSelect = (option: { value: IDealer; label: string }) => {
    setSelectedDealer(option.value);

    onSelectInstance(selectedDealer);
  };

  useEffect(() => {
    if (selectedDealer) {
      dispatch(getEntity(selectedDealer.id));
    }
  }, [selectedDealer]);

  return (
    <div>
      <div>Dealer</div>
      <AsyncSelect
        value={selectedDealer ? { value: selectedDealer, label: selectedDealer.name } : null}
        onChange={handleOptionSelect}
        loadOptions={loadOptions}
        placeholder={translate('calvaryErp.dealer.dealerTypePlaceholder')}
        styles={customStyles}
      />
    </div>
  );
};

export default DealerAutocomplete;
