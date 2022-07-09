import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export const ProfileImage = (props: { photoURL: string }) => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  console.log(currentUser.photoURL);

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      console.log(error);
      setError('Failed to log out');
    }
  }

  const styles: any = {
    card: {
      width: '75px',
      height: '75px',
    },

    dsTop: {
      position: 'absolute',
      margin: 'auto',
      top: '0',
      right: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'crimson',
      animation: 'dsTop 1.5s',
    },

    avatarHolder: {
      position: 'absolute',
      margin: 'auto',
      top: '10%',
      right: '0',
      left: '0',
      width: '80%',
      height: '80%',
      'border-radius': '50%',
      'box-shadow': '0 0 0 5px #151515, inset 0 0 0 5px #000000, inset 0 0 0 5px #000000, inset 0 0 0 5px #000000, inset 0 0 0 5px #000000',
      background: 'white',
      overflow: 'hidden',
      animation: 'mvTop 1.5s',
    },

    avatarHolderImg: {
      width: '50px',
      height: '50px',
      'object-fit': 'cover',
      'border-radius': '50%',
    },
  };

  const photoURL =
    props.photoURL.length !== 0
      ? props.photoURL
      : currentUser.photoURL
      ? currentUser.photoURL
      : require('../assets/images/blank-profile.png');

  return (
    <>
      <img
        style={styles.avatarHolderImg}
        // src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
        src={photoURL}
        alt="Albert Einstein"
      />
    </>
  );
};
