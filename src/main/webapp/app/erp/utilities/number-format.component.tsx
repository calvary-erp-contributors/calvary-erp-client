import React from 'react';
import numeral from 'numeral';

interface NumberFormatProps {
  formattedNumber: number;
}

export function NumberFormatComponent(numberFormatProps: NumberFormatProps) {
  const formattedNumber = numeral(numberFormatProps.formattedNumber).format('0,0.00');

  return (
    <div>
      <p>{formattedNumber}</p>
    </div>
  );
}

export default NumberFormatComponent;
