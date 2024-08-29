import React, {useState} from 'react';

import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../../Colors';
import PretendardText from '../PretendardText';
import {setValue} from '../../plugins/firebase';
import {useRecoilState} from 'recoil';
import {currentThemeState} from '../../atoms';

const HintView = ({message1, message2, isPreview}) => {
  const [active, setActive] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);

  const hintOnPress = () => {
    if (!active && !isPreview) {
      const newThemeValue = {
        ...currentTheme,
        hintCount: currentTheme.hintCount + 1,
      };
      setCurrentTheme({...newThemeValue});
      setValue(`/gameStatus/theme-${currentTheme.id}`, newThemeValue);
    }
    setActive(true);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.question} onPress={() => hintOnPress()}>
        <PretendardText style={styles.questionMark}>?</PretendardText>
      </Pressable>
      {!active ? (
        <PretendardText style={styles.hintText}>HINT</PretendardText>
      ) : (
        <View>
          <View style={styles.messageContainer}>
            <PretendardText style={styles.message}>{message1}</PretendardText>
          </View>
          <View style={styles.border} />
          {!messageVisible ? (
            <Pressable
              onPress={() => setMessageVisible(true)}
              style={styles.messageContainer}>
              <Image
                source={require('../../assets/images/locker.png')}
                style={{marginBottom: 16}}
              />
              <PretendardText
                style={{...styles.message, color: Colors.neonYellow}}>
                터치하면 정답이 보입니다.
              </PretendardText>
            </Pressable>
          ) : (
            <View style={styles.messageContainer}>
              <PretendardText style={styles.message}>{message2}</PretendardText>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default HintView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  question: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  questionMark: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.black,
  },
  hintText: {
    color: Colors.primary,
    letterSpacing: 10,
    fontSize: 32,
  },
  messageContainer: {
    width: 320,
    height: 180,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  border: {
    borderWidth: 1,
    marginVertical: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
});
