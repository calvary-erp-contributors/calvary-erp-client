import dayjs from 'dayjs';

import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';

export const displayDefaultDateTime = () => dayjs().format(APP_LOCAL_DATETIME_FORMAT);

export const convertDateTimeFromServer = date => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : displayDefaultDateTime);

export const convertDateTimeToServer = date => (date ? dayjs(date).toDate() : displayDefaultDateTime);
