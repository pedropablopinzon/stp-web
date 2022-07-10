import React from 'react';

export const IconSvg = (props: { photoURL: string; width: string; height: string }) => {

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
      width: props.width.length === 0 ? '50px' : props.width,
      height: props.height.length === 0 ? '50px' : props.height,
      objectFit: 'cover',
      borderRadius: '50%',
    },
  };

  const photoURL =
    props.photoURL.length !== 0
      ? require(`../assets/svg/${props.photoURL}`)
      : require('../assets/images/blank-profile.png');

  return (
    <>
      <img
        style={styles.avatarHolderImg}
        src={photoURL}
      />
    </>
  );
};
