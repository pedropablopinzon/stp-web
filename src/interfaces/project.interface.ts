import { Status } from '../types/Status.types';

export interface IProject {
  documentId?: string | null;

  name?: string;
  businessId?: string;
  businessName?: string;

  status?: Status;
  createdAt?: Date;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
