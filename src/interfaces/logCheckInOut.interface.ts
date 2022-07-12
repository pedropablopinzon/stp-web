export interface ILogCheckInOut {
  documentId?: string;
  projectId?: string;
  projectName?: string;
  userId?: string;
  checkOut?: boolean;
  email?: string;
  userName?: string;
  checkInAt?: Date;
  checkOutAt?: Date;
  businessId?: string;
  businessName?: string;

  createdAt?: Date;
  createdBy?: string;
  createdByEmail?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedByEmail?: string;
}
