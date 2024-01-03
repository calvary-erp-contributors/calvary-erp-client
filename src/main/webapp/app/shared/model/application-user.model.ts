import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IApplicationUser {
  id?: number;
  applicationIdentity?: string;
  lastLoginTime?: string | null;
  timeOfCreation?: string;
  lastTimeOfModification?: string | null;
  userIdentifier?: string;
  createdBy?: IApplicationUser | null;
  lastModifiedBy?: IApplicationUser | null;
  systemIdentity?: IUser;
}

export const defaultValue: Readonly<IApplicationUser> = {};
