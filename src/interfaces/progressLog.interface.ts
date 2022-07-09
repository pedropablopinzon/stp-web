import { Status } from '../types/status.types';

export interface IProgressLog {
  documentId?: string | null;

  projectId: string;
  projectName?: string;
  comment?: string;
  imageUrl?: string;
  createdByEmail?: string;

  status?: Status;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
