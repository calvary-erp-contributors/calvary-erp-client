import React from 'react';
import { convertUUIDFromServer } from 'app/shared/util/uuid-util';

export function UUIDFormatComponent(uuidFormatComponentProps: { formattedUUID: string }) {
  const formattedUUID = convertUUIDFromServer(uuidFormatComponentProps.formattedUUID);

  return (
    <div>
      <p>{formattedUUID}</p>
    </div>
  );
}

export default UUIDFormatComponent;
