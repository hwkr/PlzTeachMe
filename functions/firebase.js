import Rebase from 're-base';

const firebaseConfig = {
  apiKey: 'AIzaSyBKhhwf6WRJpU1idsiU7Su2T-K-35480ac',
  authDomain: 'plzteachme-52024.firebaseapp.com',
  databaseURL: 'https://plzteachme-52024.firebaseio.com',
  storageBucket: 'plzteachme-52024.appspot.com',
  messagingSenderId: '735395705579',
};

const ref = Rebase.createClass(firebaseConfig);

export function getFirebaseInstance() {
  return ref;
}
