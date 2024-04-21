import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { translate } from 'react-jhipster';
import { useAppDispatch } from 'app/config/store';
import { getEntity, getSelectedEntity } from '../sales-receipt-email-persona/sales-receipt-email-persona.reducer';
import { ISalesReceiptEmailPersona } from 'app/shared/model/sales-receipt-email-persona.model';

const apiSearchUrl = 'api/app/_search/sales-receipt-email-personas';

interface M2MSalesReceiptEmailPersonaAutocompleteProps {
  onSelectInstances: (accounts: ISalesReceiptEmailPersona[]) => void;
}

const M2MSalesReceiptEmailPersonaAutocomplete: React.FC<M2MSalesReceiptEmailPersonaAutocompleteProps> = ({ onSelectInstances }) => {
  const [selectedPersonas, setSelectedPersonas] = useState<ISalesReceiptEmailPersona[]>([]);

  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    const requestUrl = `${apiSearchUrl}?query=${inputValue}`;
    try {
      const response = await axios.get(requestUrl);
      return response.data.map((result: ISalesReceiptEmailPersona) => ({
        value: result,
        label: result.preferredGreetingDesignation,
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

  const handleOptionSelect = (options: { value: ISalesReceiptEmailPersona; label: string }[]) => {
    const selected = options.map(option => option.value); // Extract values from selected options

    setSelectedPersonas(selected);

    onSelectInstances(selectedPersonas); // Pass selected personas to callback
  };

  useEffect(() => {
    // Let's dispatch an action for each selected persona
    selectedPersonas.forEach(persona => {
      if (persona) {
        dispatch(getSelectedEntity(persona.id));
      }
    });
  }, [selectedPersonas]);

  return (
    <div>
      <div>Sales Receipt Email Persona(s)</div>
      <AsyncSelect
        isMulti
        value={selectedPersonas.map(persona => ({
          value: persona,
          label: persona.preferredGreetingDesignation,
        }))}
        onChange={handleOptionSelect}
        loadOptions={loadOptions}
        placeholder={translate('calvaryErp.dealer.dealerTypePlaceholder')}
        styles={customStyles}
      />
    </div>
  );
};

export default M2MSalesReceiptEmailPersonaAutocomplete;
