import { Rol } from '../types/Rol.types';
import { StatusInvitation } from '../types/Status.types';

export interface IInvitation {
  documentId?: string | null;

  businessId?: string;
  businessName?: string;
  email?: string;
  rolId?: Rol;

  status?: StatusInvitation;
  createdAt?: Date;
  createdAtNumber?: number;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
