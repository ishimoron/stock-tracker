export enum AuthenticationErrors {
  EMAIL_EXIST = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
  CREDENTIAL_SIGNIN = 'CredentialsSignin',
  TO_MANY_REQUESTS = 'auth/too-many-requests',
  NOT_FOUND = 'auth/user-not-found',
  NOT_ALLOWED = 'auth/operation-not-allowed',
  WEAK_PASSWORD = 'auth/weak-password',
}
