'use client';
import { auth } from '@/app/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './style.module.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const { push } = useRouter();
  const resetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        push('/signin');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form__control}>
          <div className={styles.form__label}>
            <label htmlFor='email'>Email address</label>
          </div>
          <input
            id='email'
            type='email'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            className={styles.form__field}
            placeholder='Email'
            required
          />
          <button
            onClick={resetEmail}
            className={styles.form__button}
            disabled={!email}
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
