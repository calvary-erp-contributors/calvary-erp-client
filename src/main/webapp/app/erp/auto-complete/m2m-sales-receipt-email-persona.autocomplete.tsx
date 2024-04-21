import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { translate } from 'react-jhipster';
import { useAppDispatch } from 'app/config/store';
import { getSelectedEntity, searchEntities } from '../sales-receipt-email-persona/sales-receipt-email-persona.reducer';
import { ISalesReceiptEmailPersona } from 'app/shared/model/sales-receipt-email-persona.model';
import { AxiosResponse } from 'axios';

interface M2MSalesReceiptEmailPersonaAutocompleteProps {
  onSelectInstances: (accounts: ISalesReceiptEmailPersona[]) => void;
}

const M2MSalesReceiptEmailPersonaAutocomplete: React.FC<M2MSalesReceiptEmailPersonaAutocompleteProps> = ({ onSelectInstances }) => {
  const [selectedPersonas, setSelectedPersonas] = useState<ISalesReceiptEmailPersona[]>([]);

  const dispatch = useAppDispatch();

  const loadOptions = async (inputValue: string) => {
    try {
      // dispatch query to store
      const result = await dispatch(searchEntities({ query: inputValue }));
      const response = result.payload as AxiosResponse;

      return response.data.map((result: ISalesReceiptEmailPersona) => ({
        value: result,
        label: `Persona # : ${result.id} | Designation: ${result.preferredGreetingDesignation} | Email: ${result.mainEmail}`,
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
          label: `Persona # : ${persona.id} | Designation: ${persona.preferredGreetingDesignation} | email: ${persona.mainEmail}`,
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
