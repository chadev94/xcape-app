import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
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
import {getOnValue} from '../plugins/firebase';
import Loading from './Loading';
import TagModal from '../components/TagModal';
import PasswordModal from '../components/PasswordModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useInitialLoading} from '../context/InitialLoadingContext';

export default function Home({navigation}) {
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
  const setMerchantList = useSetRecoilState(merchantListState);
  const setThemeList = useSetRecoilState(themeListState);
  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);
  const setViewList = useSetRecoilState(viewListState);

  const {loading, setLoading} = useInitialLoading();

  useEffect(() => {
    hasInitialData().then(flag => {
      if (!flag) {
        navigation.navigate('Download');
      } else {
        getItem('merchantList').then(res => setMerchantList(JSON.parse(res)));
        getItem('themeList').then(res => setThemeList(JSON.parse(res)));
        getItem('hintList').then(res => setHintList(JSON.parse(res)));
        getItem('tagList').then(res => setTagList(JSON.parse(res)));
        getItem('viewList').then(res => setViewList(JSON.parse(res)));
        getItem('themeId').then(themeId => {
          return getOnValue(`/gameStatus/theme-${themeId}`, theme => {
            if (theme) {
              setCurrentTheme(() => {
                setLoading(false);
                return {...currentTheme, ...theme};
              });
            } else {
              setLoading(false);
            }
          });
        });
      }
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
