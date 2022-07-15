import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from '../firebase';

export const Storage = (props: { onFileUploaded: Function }) => {
  // State to store uploaded file
  const [file, setFile] = useState('');

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert('Please upload an image first!');
    }
    const fileNumber = new Date().getTime();

    // @ts-ignore
    const storageRef = ref(storage, `/files/${fileNumber}_${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    // @ts-ignore
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot: any) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercent(percent);
      },
      (err: any) => console.error(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          console.log(url);
          props.onFileUploaded(url);
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <>
      <div className="mb-2">
        <input type="file" onChange={handleChange} accept="/image/*" />
        {file.length !== 0 ? <p>{percent} % done</p> : null}
      </div>
    </>
  );
};
