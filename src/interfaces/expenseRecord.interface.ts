import { Status } from '../types/Status.types';

export interface IExpenseRecord {
  documentId?: string | null;

  projectId?: string;
  projectName?: string;
  amount?: number;
  comment?: string;
  imagesUrl?: string[];

  status?: Status;
  createdAt?: Date;
  createdAtNumber?: number;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
