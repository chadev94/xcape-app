import React, {useState} from 'react';

import {
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalComponent from './ModalComponent';
import {Action, usePasswordModal} from '../context/PasswordModalContext';
import {Colors} from '../Colors';
import {useNavigation} from '@react-navigation/native';
import {setValue} from '../plugins/firebase';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentThemeState, tagListState} from '../atoms';
import ResetIcon from './icons/ResetIcon';
import MenuIcon from './icons/MenuIcon';
import EyeIcon from './icons/EyeIcon';
import EyeOffIcon from './icons/EyeOffIcon';
import CloseIcon from './icons/CloseIcon';
import Gradient from './Gradient';

const PasswordModal = () => {
  const navigation = useNavigation();

  const {passwordModalVisible, closePasswordModal, action} = usePasswordModal();
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const tagList = useRecoilValue(tagListState);

  const validatePassword = password => {
    return password === '5772';
  };

  const resetGame = () => {
    if (currentTheme.id > 0 && currentTheme.merchantId > 0) {
      const tagListByThemeId = tagList.filter(
        tag => tag.themeId === currentTheme.id,
      );

      const tagIdList = tagListByThemeId.map(({id}) => {
        return {id, isUsed: false};
      });

      const resetThemeValue = {
        ...currentTheme,
        isPlaying: false,
        hintCount: 0,
        progress: 0,
        tagIdList,
      };
      setValue(`/gameStatus/theme-${currentTheme.id}`, {
        ...resetThemeValue,
      }).then(() => {
        setCurrentTheme({...resetThemeValue});
        closePasswordModal();
      });
    }
  };

  const doAction = () => {
    if (action === Action.TO_SETTINGS) {
      navigation.navigate('Settings');
    } else if (action === Action.RESET) {
      resetGame();
    }
    closePasswordModal();
  };

  const onSubmit = password => {
    const isValidate = validatePassword(password);
    if (isValidate) {
      doAction();
    } else {
      ToastAndroid.show('비밀번호를 확인해 주세요.', ToastAndroid.SHORT);
    }
  };

  const getGradientColor = () => {
    return action === Action.RESET
      ? ['rgba(255, 67, 67, 0.70)', 'rgba(111, 2, 178, 0.70)']
      : ['rgba(31, 255, 201, 0.70)', 'rgba(111, 2, 178, 0.70)'];
  };

  const getIcon = () => {
    return action === Action.RESET ? (
      <ResetIcon color={Colors.primary} size={48} />
    ) : (
      <MenuIcon color={Colors.primary} size={48} />
    );
  };

  return (
    <ModalComponent modalVisible={passwordModalVisible}>
      <View style={styles.centeredView}>
        <Gradient
          colors={getGradientColor()}
          style={styles.gradient}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}>
          <TouchableOpacity
            onPress={() => {
              closePasswordModal();
            }}
            style={styles.actionButton}>
            <CloseIcon />
          </TouchableOpacity>
          {getIcon()}
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus={true}
              style={styles.password}
              inputMode={'numeric'}
              secureTextEntry={!passwordVisible}
              maxLength={4}
              returnKeyType={'done'}
              onSubmitEditing={e => {
                onSubmit(e.nativeEvent.text);
              }}
            />
            <Pressable
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              {passwordVisible ? (
                <EyeIcon size={32} />
              ) : (
                <EyeOffIcon size={32} />
              )}
            </Pressable>
          </View>
        </Gradient>
      </View>
    </ModalComponent>
  );
};

export default PasswordModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  gradient: {
    width: '90%',
    alignItems: 'center',
    paddingVertical: 32,
    borderRadius: 15,
  },
  modalView: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    marginVertical: 12,
    width: '80%',
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  password: {
    width: '80%',
    paddingHorizontal: 16,
    color: Colors.black,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  actionButton: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  actionText: {
    color: Colors.white,
    fontSize: 24,
  },
});
