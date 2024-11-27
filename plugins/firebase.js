import database from '@react-native-firebase/database';

export const getValue = async ref => {
  return database()
    .ref(ref)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
};

export const setValue = async (ref, value) => {
  return database()
    .ref(ref)
    .set(value)
    .then(() => {
      console.log('success! ', value);
    })
    .catch(console.error);
};

export const getOnValue = (ref, callback) => {
  return database()
    .ref(ref)
    .on('value', snapshot => {
      callback(snapshot.val());
    });
};
