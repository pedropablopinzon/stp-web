import React from 'react';
import { useParams } from 'react-router-dom';

export const BusinessUsers = () => {
  // @ts-ignore
  const { id } = useParams();

  return (
    <>
      <h1>BusinessUsers</h1>
      <h3>ID: {id}</h3>
    </>
  );
};
