import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB0rR2nnaa8jJ8vXL6iiKDpafm1lPs1W-A',
  authDomain: 'stock-tracker-aba35.firebaseapp.com',
  projectId: 'stock-tracker-aba35',
  storageBucket: 'stock-tracker-aba35.appspot.com',
  messagingSenderId: '339248636704',
  appId: '1:339248636704:web:dee81145e587a5e1c0ad45',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
