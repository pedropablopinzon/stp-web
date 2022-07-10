import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import { IInvitation } from '../interfaces/invitation.interface';
import { fetchInvitationsByEmail } from '../modules/db';
import { sortItems } from '../modules/utils';
import { InvitationsTable } from './tables/Invitations.table';

export const Invitations = () => {
  const { currentUser } = useAuth();

  const defaultDocument: IInvitation = {
    documentId: null,
    businessId: '',
    businessName: '',
    status: 'ACTIVE',
    email: '',
    rolId: 'OWNER',
  };

  const [items, setItems] = useState<IInvitation[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<IInvitation>(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState<IInvitation>(defaultDocument);

  useEffect(() => {
    fetchInvitationsByEmail(currentUser.email).then((data: any) => {
      sortItems(data, 'createdAtNumber', 'desc');
      setItems(data);
    });
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{'Invitaciones: '}</Card.Title>
        </Card.Body>
      </Card>
      <InvitationsTable items={items} onEditDocument={setSelectedDocument} onDeleteDocument={setDeletedDocument} />
    </>
  );
};
