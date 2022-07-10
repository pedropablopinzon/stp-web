import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import { Rol } from '../types/rol.types';

export const SelectRol = (props: { onSelectedRol: Function; rolId: Rol }) => {
  const [items, setItems] = useState<Rol[]>(['OWNER', 'EDITOR', 'OPERATOR']);
  const [selectedRolId, setSelectedRolId] = useState<Rol>(props.rolId);

  const handleBusinessChange = (e: any) => {
    const roles: Rol[] = items.filter((element: Rol) => element === e.target.value);
    if (roles.length > 0) {
      setSelectedRolId(e.target.value);
      props.onSelectedRol(e.target.value);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <select className="dropdown-toggle btn btn-info" onChange={handleBusinessChange} value={selectedRolId}>
              {items.map((item: string) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};
