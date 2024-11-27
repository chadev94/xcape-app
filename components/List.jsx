import React from 'react';

import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Colors';
import PretendardText from './PretendardText';
import Ionicons from 'react-native-vector-icons/Ionicons';

const List = ({list, onPress, displayName, previewVisible, previewOnPress}) => {
  return (
    <View style={styles.container}>
      {list.map(item => {
        return (
          <View
            key={item.id}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              key={item.id}
              onPress={() => onPress(item.id)}
              style={styles.button}>
              <PretendardText style={styles.text}>
                {item[displayName]}
              </PretendardText>
            </TouchableOpacity>
            {previewVisible && (
              <Pressable
                style={styles.previewContainer}
                onPress={() => previewOnPress(item.id)}>
                <Ionicons
                  name={'image-outline'}
                  color={Colors.black}
                  size={32}
                />
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    marginBottom: 5,
    paddingVertical: 16,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neonYellow,
    borderRadius: 10,
  },
  text: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: '700',
  },
  previewContainer: {
    backgroundColor: Colors.primary,
    marginLeft: 15,
    padding: 16,
    borderRadius: 10,
  },
});
