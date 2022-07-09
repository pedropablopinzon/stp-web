import { Status } from '../types/status.types';

export interface IProgressLog {
  documentId?: string | null;

  projectId?: string;
  projectName?: string;
  comment?: string;
  imagesUrl?: string[];
  createdByEmail?: string;

  status?: Status;
  createdAt?: Date;
  createdAtNumber?: number;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
