import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function CheckIn() {
  return (
    <>
      <table>
        <tr>
          <td>
            <Link to="/home" className="btn btn-primary w-100 mt-3">
              Home
            </Link>
          </td>
          <td>
            <h1>Check In</h1>
          </td>
        </tr>
      </table>
    </>
  );
}
