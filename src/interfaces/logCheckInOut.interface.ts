export interface ILogCheckInOut {
  documentId?: string;
  projectId?: string;
  projectName?: string;
  userId?: string;
  checkOut?: boolean;
  email?: string;
  checkInAt?: Date;
  checkOutAt?: Date;

  createdAt?: Date;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
