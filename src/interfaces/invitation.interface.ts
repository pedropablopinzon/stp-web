import { Rol } from '../types/rol.types';
import { StatusInvitation } from '../types/status.types';

export interface IInvitation {
  documentId?: string | null;

  businessId: string;
  businessName: string;
  // userId: string;
  // userName: string;
  email: string;
  rolId: Rol;

  status?: StatusInvitation;
  createdAt?: Date;
  createdAtNumber?: number;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
