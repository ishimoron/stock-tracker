'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styles from './styles.module.css';

const User: React.FC = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  return (
    <div className={styles.userContainer}>
      {session && (
        <div className={styles.userWrapper}>
          <div className={styles.userTitle}>
            <span className={styles.greetings}>Hello👋</span>{' '}
            {session?.user?.email}!
          </div>
          <button onClick={() => signOut()} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
