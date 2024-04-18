import { uuidv7 } from 'uuidv7';

export const defaultUUID = () => uuidv7();

export const convertUUIDFromServer = uuidValue => (uuidValue ? uuidValue.slice(-12) : defaultUUID());
