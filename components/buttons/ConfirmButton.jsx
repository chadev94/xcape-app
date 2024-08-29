import React from 'react';

import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../Colors';

const ConfirmButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require('../../assets/images/checkmark.png')}
        style={{width: 40, height: 40}}
      />
    </TouchableOpacity>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: Colors.primary,
  },
});
