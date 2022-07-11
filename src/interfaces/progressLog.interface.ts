import { Status } from '../types/status.types';

export interface IProgressLog {
  documentId?: string | null;

  projectId?: string;
  projectName?: string;
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
