import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    throw e;
  }
};

export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw e;
  }
};

export const hasInitialData = async () => {
  const length = (await AsyncStorage.getAllKeys(null)).length;
  return length !== 0;
};
