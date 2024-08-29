import {StyleSheet, TextInput, View, ToastAndroid} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {viewListState} from '../../atoms';
import {Colors} from '../../Colors';
import ConfirmButton from '../buttons/ConfirmButton';

const AnswerView = props => {
  const viewList = useRecoilValue(viewListState);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const passwordRef = useRef();

  const answer = props.answer.toUpperCase();

  const checkAnswer = () => {
    if (answer === password.toUpperCase()) {
      const viewListByTagId = viewList
        .filter(view => view.tagId === props.targetTagId)
        .sort((a, b) => a.orders - b.orders);
      navigation.push('TagView', {viewList: viewListByTagId});
    } else {
      ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
      setPassword('');
      passwordRef.current.clear();
    }
  };

  const placeholder = '*'.repeat(props.answer.length);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholderTextColor={Colors.black}
          maxLength={props.answer.length}
          placeholder={placeholder}
          autoCapitalize={'characters'}
          multiline={true}
          numberOfLines={1}
          blurOnSubmit={true}
          returnKeyType={'search'}
          ref={passwordRef}
        />
      </View>
      <ConfirmButton onPress={() => checkAnswer()} />
    </View>
  );
};

export default AnswerView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    width: '65%',
    paddingHorizontal: 4,
  },
  input: {
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 22,
    padding: 14,
    textAlign: 'center',
    letterSpacing: 8,
    borderRadius: 3,
  },
});
