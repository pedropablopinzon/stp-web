import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function MenuButton(props: { text: string; url: string; variant: string }) {
  const history = useHistory();

  const navigateTo = () => {
    history.push(props.url);
  };

  return (
    <>
      <Button variant={props.variant} onClick={navigateTo}>
        {props.text}
      </Button>
    </>
  );
}
