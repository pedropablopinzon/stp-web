import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext(null);

export function useAuth(): any {
  return useContext(AuthContext);
}

// @ts-ignore
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    localStorage.setItem('workingLogCheckInOutId', '');
    localStorage.setItem('workingProjectId', '');
    localStorage.setItem('workingProjectName', '');
    localStorage.setItem('workingProjectCheckInAt', '');

    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string) {
    // @ts-ignore
    return currentUser.updateEmail(email);
  }

  function updatePassword(password: string) {
    // @ts-ignore
    return currentUser.updatePassword(password);
  }

  function updateProfile(displayName: string) {
    // @ts-ignore
    return currentUser.updateProfile({ displayName });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={value}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
