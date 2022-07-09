import { Status } from '../types/status.types';

export interface IBusiness {
  documentId?: string | null;

  name: string;
  taxId: string;
  address: string;
  businessId?: string;

  status?: Status;
  createdAt?: Date;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
