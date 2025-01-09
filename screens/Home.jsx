import {
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {
  currentThemeState,
  hintListState,
  merchantListState,
  tagListState,
  themeListState,
  viewListState,
} from '../atoms';
import {getItem, hasInitialData} from '../plugins/storage';
import ProgressBar from '../components/ProgressBar';
import Controller from '../components/Controller';
import {Colors} from '../Colors';
import {getOnValue, getValue} from '../plugins/firebase';
import Loading from './Loading';
import TagModal from '../components/TagModal';
import PasswordModal from '../components/PasswordModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useInitialLoading} from '../context/InitialLoadingContext';

export default function Home({navigation}) {
  const setCurrentTheme = useSetRecoilState(currentThemeState);
  const setMerchantList = useSetRecoilState(merchantListState);
  const setThemeList = useSetRecoilState(themeListState);
  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);
  const setViewList = useSetRecoilState(viewListState);

  const {loading, setLoading} = useInitialLoading();

  useEffect(() => {
    if (Platform.OS === 'android') {
      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: '카메라 권한',
              message: '이 앱은 카메라 권한이 필요합니다.',
              buttonPositive: '확인',
            },
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            ToastAndroid.show('카메라 권한을 설정해주세요.', ToastAndroid.LONG);
          }
        } catch (err) {
          Alert.alert('Camera permission err');
          console.warn(err);
        }
      };
      requestCameraPermission().then(() => {
        hasInitialData().then(flag => {
          if (!flag) {
            navigation.navigate('Download');
          } else {
            getItem('merchantList').then(res =>
              setMerchantList(JSON.parse(res)),
            );
            getItem('themeList').then(res => setThemeList(JSON.parse(res)));
            getItem('hintList').then(res => setHintList(JSON.parse(res)));
            getItem('tagList').then(res => setTagList(JSON.parse(res)));
            getItem('viewList').then(res => setViewList(JSON.parse(res)));
            getItem('themeId').then(async themeId => {
              if (themeId) {
                const gameStatusByThemeId = await getValue(
                  `/gameStatus/theme-${themeId}`,
                );
                setCurrentTheme({...gameStatusByThemeId});
              }
              setLoading(false);
            });
          }
        });
      });
    }

    getOnValue('/gameStatus', gameStatus => {
      getItem('themeId').then(async themeId => {
        const gameStatusByThemeId = await gameStatus[`theme-${themeId}`];
        if (themeId && gameStatusByThemeId) {
          setCurrentTheme({...gameStatusByThemeId});
        }
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <TagModal />
        <PasswordModal />
        {loading && <Loading />}
        <ProgressBar />
        <Controller />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
