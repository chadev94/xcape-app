import React from 'react';
import {useRecoilValue} from 'recoil';
import {merchantListState} from '../atoms';
import List from '../components/List';

const TagWrite = ({navigation}) => {
  const merchantList = useRecoilValue(merchantListState);

  return (
    <List
      list={merchantList}
      displayName={'displayName'}
      onPress={value => {
        navigation.push('ThemeSelect', {merchantId: value});
      }}
    />
  );
};

export default TagWrite;
