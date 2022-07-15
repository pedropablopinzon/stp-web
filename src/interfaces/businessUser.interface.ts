import { Rol } from '../types/Rol.types';
import { Status } from '../types/Status.types';

export interface IBusinessUser {
  documentId?: string | null;

  businessId?: string;
  userId?: string;
  rolId?: Rol;
  email?: string;
  userName?: string;

  status?: Status;
  createdAt?: Date;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
