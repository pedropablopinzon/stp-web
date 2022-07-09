import { Status } from '../types/status.types';

export interface IProject {
  documentId?: string | null;

  name?: string;

  status?: Status;
  createdAt?: Date;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
