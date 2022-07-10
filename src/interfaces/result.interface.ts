export interface IResult {
  status: boolean;
  message: string;

  show: boolean;
  variant: string;
  title: string;
  subtitle: string;

  collectionName?: string;
  documentId?: string;
}
