import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { db } from "../firebase";

export default function CheckIn() {
  const history = useHistory();

  const checkIn = async () => {
    db.collection("logCheckInOut")
      .add({
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    history.push("/home");
  };

  return (
    <>
      <Link to="/home" className="btn btn-primary w-100 mt-3">
        Home
      </Link>
      <Button variant="success" onClick={checkIn}>
        Check In
      </Button>
    </>
  );
}
