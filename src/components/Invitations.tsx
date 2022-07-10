import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import { IInvitation } from '../interfaces/invitation.interface';
import { fetchInvitationsByEmail, rejectInvitation } from '../modules/db';
import { deleteItem, sortItems } from '../modules/utils';
import { ConfirmDelete } from './ConfirmDelete';
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
  const [acceptedDocument, setAcceptedDocument] = useState<IInvitation>(defaultDocument);
  const [rejectedDocument, setRejectedDocument] = useState<IInvitation>(defaultDocument);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  useEffect(() => {
    fetchInvitationsByEmail(currentUser.email).then((data: any) => {
      sortItems(data, 'createdAtNumber', 'desc');
      setItems(data);
    });
  }, []);

  useEffect(() => {
    if (acceptedDocument.documentId) {
      console.log(acceptedDocument);

      const newItems = deleteItem(items, acceptedDocument.documentId);

      setItems(newItems);
    }
  }, [acceptedDocument]);

  useEffect(() => {
    if (rejectedDocument.documentId) {
      console.log(rejectedDocument);
      setShowConfirm(true);
    }
  }, [rejectedDocument]);

  const handleCloseConfirm = () => {
    setRejectedDocument(defaultDocument);
    setShowConfirm(false);
  };

  const removeDocument = async () => {
    if (rejectedDocument.documentId) {
      await rejectInvitation(currentUser, rejectedDocument.documentId);

      const newItems = deleteItem(items, rejectedDocument.documentId);

      setItems(newItems);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{'Invitaciones: '}</Card.Title>
        </Card.Body>
      </Card>

      <ConfirmDelete
        show={showConfirm}
        onHide={handleCloseConfirm}
        handleAcceptConfirm={removeDocument}
        title={`Rechazar Invitacion`}
        subtitle={`Empresa: ${rejectedDocument.businessName}`}
        acceptButtonText='Rechazar'
      />

      <InvitationsTable items={items} onAcceptInvitation={setAcceptedDocument} onRejectInvitation={setRejectedDocument} />
    </>
  );
};
