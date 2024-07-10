'use client';
import { auth } from '@/app/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';
import { AuthenticationErrors } from '@/app/enums/AuthenticationError';

interface AuthenticationFormProps {
  isSignUp: boolean;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  isSignUp,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { push } = useRouter();

  const handleSignIn = async () => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        checkErrorType(result.error);
      } else {
        push('/');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        push('/signin');
      })
      .catch((error) => {
        checkErrorType(error.code);
      });
  };

  const checkErrorType = (error: string) => {
    let errorMessage = '';
    switch (error) {
      case AuthenticationErrors.EMAIL_EXIST:
        errorMessage = 'This email is already in use';
        break;
      case AuthenticationErrors.INVALID_EMAIL:
        errorMessage = 'Invalid email address';
        break;
      case AuthenticationErrors.INVALID_CREDENTIAL:
        errorMessage = 'Invalid credentials';
        break;
      case AuthenticationErrors.CREDENTIAL_SIGNIN:
        errorMessage = 'Cant login, try again later...';
        break;
      case AuthenticationErrors.TO_MANY_REQUESTS:
        errorMessage = 'To many requests';
        break;
      case AuthenticationErrors.NOT_FOUND:
        errorMessage = 'User not found';
        break;
      case AuthenticationErrors.NOT_ALLOWED:
        errorMessage = 'Operation not allowed';
        break;
      case AuthenticationErrors.WEAK_PASSWORD:
        errorMessage = 'Password is too weak';
        break;
      default:
        errorMessage = 'An unexpected error occurred: ' + error;
        break;
    }
    setError(errorMessage);
    console.log(errorMessage);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.error}>{error && error}</div>
        <div>
          <h2 className={styles.title}>
            {isSignUp ? 'Sign up for your account' : 'Sign in to your account'}
          </h2>

          <div>
            <div>
              <div className={styles.form__control}>
                <div className={styles.form__label}>
                  <label htmlFor='email'>Email address</label>
                </div>
                <input
                  id='email'
                  type='email'
                  autoComplete='email'
                  onChange={(e) => {
                    setError('');
                    setEmail(e.target.value);
                  }}
                  className={styles.form__field}
                  placeholder='Email'
                  required
                />
              </div>

              <div className={styles.form__control}>
                <div className={styles.passwordWrapper}>
                  <label htmlFor='password' className={styles.form__label}>
                    Password
                  </label>
                  <div
                    onClick={() => push('/forgot-password')}
                    className={styles.forgotPassword}
                  >
                    Forgot password?
                  </div>
                </div>

                <div>
                  <input
                    id='password'
                    type='password'
                    autoComplete='new-password'
                    onChange={(e) => {
                      setError('');
                      setPassword(e.target.value);
                    }}
                    className={styles.form__field}
                    placeholder='Password'
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <div className={styles.form__control}>
                    <div className={styles.form__label}>
                      <label htmlFor='repeatPassword'>Repeat Password</label>
                    </div>
                    <input
                      id='repeatPassword'
                      type='password'
                      autoComplete='new-password'
                      onChange={(e) => {
                        setError('');
                        setRepeatedPassword(e.target.value);
                      }}
                      className={styles.form__field}
                      placeholder='Repeat password'
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                {isSignUp ? (
                  <button
                    onClick={handleSignUp}
                    disabled={
                      !email || !password || password !== repeatedPassword
                    }
                    className={styles.form__button}
                  >
                    Sign Up
                  </button>
                ) : (
                  <button
                    onClick={handleSignIn}
                    disabled={!email || !password}
                    className={styles.form__button}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>

            {!isSignUp ? (
              <div className={styles.notMember}>
                Not a member?{' '}
                <button onClick={() => push('signup')}>Sign Up</button>
              </div>
            ) : (
              <div className={styles.notMember}>
                Remember login?{' '}
                <button onClick={() => push('signin')}>Sign In</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationForm;
