import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { IBusiness } from '../interfaces/business.interface';
import { IBusinessUser } from '../interfaces/businessUser.interface';
import { fetchBusinesses, getBusinessesByUser } from '../modules/db';
import { sortItemsString } from '../modules/utils';

export const WorkingBusiness = () => {
  const { currentUser } = useAuth();

  let workingBusinessId = localStorage.getItem('workingBusinessId');
  const workingBusinessName = localStorage.getItem('workingBusinessName');
  if (!workingBusinessId) {
    workingBusinessId = '';
  }

  const [items, setItems] = useState<IBusiness[]>([]);
  const [businessesByUser, setBusinessesByUser] = useState<IBusinessUser[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('selectBusiness');

  useEffect(() => {
    getBusinessesByUser(currentUser.uid).then((data: IBusinessUser[]) => {
      setBusinessesByUser(data);
    });
  }, []);

  useEffect(() => {
    if (businessesByUser.length > 0) {
      fetchBusinesses(businessesByUser).then((data: IBusiness[]) => {
        sortItemsString(data);
        setItems(data);
        if (workingBusinessId) {
          if (workingBusinessId.length > 0) {
            setSelectedBusinessId(workingBusinessId);
          }
        }
      });
    }
  }, [businessesByUser]);

  const handleBusinessChange = (e: any) => {
    const business: IBusiness[] = items.filter((element) => element.documentId === e.target.value);
    if (business.length > 0) {
      // @ts-ignore
      localStorage.setItem('workingBusinessId', business[0].documentId);
      localStorage.setItem('workingBusinessName', business[0].name);
      setSelectedBusinessId(e.target.value);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{'Empresa: '}
            <select className="dropdown-toggle btn btn-info" onChange={handleBusinessChange} value={selectedBusinessId}>
              <option value="selectBusiness"> -- Seleccione una Empresa -- </option>
              {items.map((business: IBusiness) => (
                // @ts-ignore
                <option value={business.documentId} key={business.documentId}>
                  {business.name}
                </option>
              ))}
            </select></Card.Title>
          <Link to="/businesses" className="btn btn-primary w-100 mt-3">
            Agregar una Nueva Empresa
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};
