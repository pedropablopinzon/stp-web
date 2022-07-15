import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import { acceptInvitationAPI, rejectInvitationAPI } from '../api/InvitationsAPI';
import { useAuth } from '../contexts/AuthContext';
import { IInvitation } from '../interfaces/Invitation.interface';
import { deleteItem, sortItems } from '../common/Utils';
import { ConfirmDelete } from './ConfirmDelete';
import { InvitationsTable } from './tables/Invitations.table';
import { getInvitationsByEmail } from '../api/stpAPI/stpFirestoreAPI/Invitations';

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
    getInvitationsByEmail(currentUser.email).then((data: any) => {
      sortItems(data, 'createdAtNumber', 'desc');
      setItems(data);
    });
  }, []);

  useEffect(() => {
    if (acceptedDocument.documentId) {
      // @ts-ignore
      acceptInvitationAPI(currentUser, acceptedDocument.documentId, acceptedDocument.businessId, acceptedDocument.rolId).then((data) => {
        // @ts-ignore
        const newItems = deleteItem(items, acceptedDocument.documentId);

        setItems(newItems);
      });
    }
  }, [acceptedDocument]);

  useEffect(() => {
    if (rejectedDocument.documentId) {
      setShowConfirm(true);
    }
  }, [rejectedDocument]);

  const handleCloseConfirm = () => {
    setRejectedDocument(defaultDocument);
    setShowConfirm(false);
  };

  const removeDocument = async () => {
    if (rejectedDocument.documentId) {
      await rejectInvitationAPI(currentUser, rejectedDocument.documentId);

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
        acceptButtonText="Rechazar"
      />

      <InvitationsTable items={items} onAcceptInvitation={setAcceptedDocument} onRejectInvitation={setRejectedDocument} />
    </>
  );
};
