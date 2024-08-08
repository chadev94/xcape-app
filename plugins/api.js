import axios from 'axios';
import {setItem} from './storage';
import Config from 'react-native-config';

export const syncInitialData = async (
  setMerchantList,
  setThemeList,
  setHintList,
  setTagList,
  setViewList,
) => {
  await axios
    .get(Config.BASE_URL + '/json/merchant/release.json', {
      headers: {
        'Cache-Control': 'no-store',
      },
    })
    .then(res => {
      setMerchantList([...res.data]);
      return setItem('merchantList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(Config.BASE_URL + '/json/theme/release.json', {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    })
    .then(res => {
      setThemeList([...res.data]);
      return setItem('themeList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(Config.BASE_URL + '/json/hint/release.json', {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    })
    .then(res => {
      setHintList([...res.data]);
      return setItem('hintList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(Config.BASE_URL + '/json/tag/release.json', {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    })
    .then(res => {
      setTagList([...res.data]);
      return setItem('tagList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(Config.BASE_URL + '/json/view/release.json', {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    })
    .then(res => {
      setViewList([...res.data]);
      return setItem('viewList', JSON.stringify(res.data));
    });
};
