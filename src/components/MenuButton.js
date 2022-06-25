import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom"


export default function MenuButton({ text, url,variant }) {
  const history = useHistory()

  const navigateTo = () => {
    history.push(url);
  };
  
  return (
    <>
      <Button variant={variant} onClick={navigateTo}>{text}</Button>
    </>
  );
}
