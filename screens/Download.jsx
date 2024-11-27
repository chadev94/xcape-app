import React, {useEffect} from 'react';

import {Image, StyleSheet, ToastAndroid, View} from 'react-native';
import {syncInitialData} from '../plugins/api';
import {useSetRecoilState} from 'recoil';
import {
  hintListState,
  merchantListState,
  tagListState,
  themeListState,
  viewListState,
} from '../atoms';
import {useInitialLoading} from '../context/InitialLoadingContext';
import {Colors} from '../Colors';
import Config from 'react-native-config';

const Download = ({navigation}) => {
  const setMerchantList = useSetRecoilState(merchantListState);
  const setThemeList = useSetRecoilState(themeListState);
  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);
  const setViewList = useSetRecoilState(viewListState);

  const {setLoading} = useInitialLoading();

  useEffect(() => {
    syncInitialData(
      setMerchantList,
      setThemeList,
      setHintList,
      setTagList,
      setViewList,
    )
      .then(() => {
        ToastAndroid.show(
          Config.ENV + '리소스 다운로드 성공!',
          ToastAndroid.LONG,
        );
        navigation.navigate('Home');
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        ToastAndroid.show(
          '다운로드를 실패했습니다. 네트워크를 확인해주세요.',
          ToastAndroid.LONG,
        );
        navigation.navigate('Home');
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/progress-logo.png')}
        tintColor={'white'}
      />
    </View>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
