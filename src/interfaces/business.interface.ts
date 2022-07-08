import { Status } from '../types/status.types';

export interface IBusiness {
  documentId?: string | null;

  name: string;
  taxId: string;
  address: string;

  status?: Status;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
