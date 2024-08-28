import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../Colors';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentThemeState, tagListState, viewListState} from '../atoms';
import {setValue} from '../plugins/firebase';
import {useTagModal} from '../context/TagModalContext';
import MenuIcon from './icons/MenuIcon';
import ResetIcon from './icons/ResetIcon';
import {usePasswordModal} from '../context/PasswordModalContext';
import {readTag} from '../plugins/nfc';
import {useNavigation} from '@react-navigation/native';
import SearchIcon from './icons/SearchIcon';
import {formatDate} from '../util/dateFormat';
import PretendardText from './PretendardText';

const Controller = () => {
  const navigation = useNavigation();

  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
  const tagList = useRecoilValue(tagListState);
  const viewList = useRecoilValue(viewListState);

  const {openTagModal, closeTagModal} = useTagModal();
  const {openPasswordModal, settingAction, resetAction} = usePasswordModal();

  const startGame = () => {
    if (currentTheme.id === 0) {
      ToastAndroid.show('테마를 선택해 주세요.', ToastAndroid.SHORT);
    } else {
      const startTime = new Date().getTime();
      const timeStatus = {
        startTime,
        endTime: startTime + currentTheme.runningTime * 60 * 1000,
        startDate: new Date().toString(),
        isPlaying: true,
      };
      setValue(`/gameStatus/theme-${currentTheme.id}`, {
        ...currentTheme,
        ...timeStatus,
      }).then(() => {
        setCurrentTheme({
          ...currentTheme,
          ...timeStatus,
        });
      });
    }
  };

  const resetGame = () => {
    resetAction();
    openPasswordModal();
  };

  const getViewListByTagId = tagId => {
    if (tagId && typeof tagId === 'number') {
      const hasTagId = tagList
        .filter(tag => tag.themeId === currentTheme.id)
        .some(currentTag => currentTag.id === tagId);

      if (hasTagId) {
        const viewListByTagId = viewList
          .filter(tag => tag.tagId === tagId)
          .sort((a, b) => a.orders - b.orders);

        navigation.navigate('TagView', {tagId, viewList: viewListByTagId});
      } else {
        ToastAndroid.show('해당 테마의 태그가 아닙니다.', ToastAndroid.SHORT);
      }
    }
  };

  const tagNfc = () => {
    openTagModal();
    readTag().then(tagId => {
      getViewListByTagId(tagId);
      closeTagModal();
    });
  };

  const setTheme = () => {
    settingAction();
    openPasswordModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {currentTheme?.isPlaying ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.startButton}
            onPress={() => {
              tagNfc();
            }}>
            <SearchIcon color={Colors.white} size={38} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.startButton}
            onPress={() => {
              startGame();
            }}>
            <Text style={styles.startText}>START</Text>
          </TouchableOpacity>
        )}
        <View style={styles.metaContainer}>
          <PretendardText style={styles.themeName}>
            {currentTheme?.nameKo || '테마를 선택해주세요.'}
          </PretendardText>
          <PretendardText style={styles.startDate}>
            {formatDate(
              isNaN(new Date(currentTheme?.startDate))
                ? new Date()
                : new Date(currentTheme?.startDate),
            )}
          </PretendardText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setTheme()}>
          <MenuIcon />
        </Pressable>
        <Pressable onPress={() => resetGame()}>
          <ResetIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default Controller;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 48,
    margin: 16,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 32,
  },
  startButton: {
    backgroundColor: Colors.black,
    borderRadius: 50,
    paddingVertical: 24,
    alignItems: 'center',
  },
  startText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
  },
  metaContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  themeName: {
    color: Colors.black,
    fontSize: 24,
    marginBottom: 8,
  },
  startDate: {
    color: Colors.date,
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    marginBottom: 16,
  },
});
