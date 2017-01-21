import Rebase from 're-base';

const firebaseConfig = {
  apiKey: 'AIzaSyBKhhwf6WRJpU1idsiU7Su2T-K-35480ac',
  authDomain: 'plzteachme-52024.firebaseapp.com',
  databaseURL: 'https://plzteachme-52024.firebaseio.com',
  storageBucket: 'plzteachme-52024.appspot.com',
  messagingSenderId: '735395705579',
};

const ref = Rebase.createClass(firebaseConfig);

export function createRoom(roomName, callback) {
  return ref.push(`rooms/${roomName}`, {
    data: { name: roomName },
  }).then(() => {
    console.log('Room Created');
    callback();
  }).catch(err => {
    // handle error
    console.log(err);
  });
}

export function getRooms(context, callback) {
  ref.fetch('rooms', {
    context,
    then(data) {
      callback(data);
    },
  });
}

export function getFirebaseInstance() {
  return ref;
}
