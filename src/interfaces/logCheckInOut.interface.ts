export interface ILogCheckInOut {
  documentId?: string;
  projectId?: string;
  userId?: string;
  checkOut?: boolean;
  email?: string;
  checkInAt?: Date;
  checkOutAt?: Date;

  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
